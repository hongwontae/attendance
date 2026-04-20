import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { ILike, In, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student-dto';
import { UpdateStudentDto } from './dto/update-student-dto';
import { AdminService } from 'src/admin/admin.service';
import { CourseEntity } from 'src/course/course.entity';
import { EnrollmentEntity } from 'src/enrollment/enrollment.entity';
import { CreateCombinedDto } from './dto/create-combined-dto';
import { SearchStudentDto } from './dto/search-student-dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepo: Repository<StudentEntity>,
    private readonly adminService: AdminService,
    @InjectRepository(EnrollmentEntity)
    private readonly enrollRepo: Repository<EnrollmentEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepo: Repository<CourseEntity>,
  ) {}

  // CRUD TEST Service
  async createStudent(studentInfo: CreateStudentDto) {
    // fk를 가진 엔티티 자체를 만들어서 admin fk 키에 추가해야 제대로 fk가 생성됩니다.
    const admin = await this.adminService.findAdminId(studentInfo.adminId);

    if (!admin) {
      throw new NotFoundException('Admin Not Found');
    }

    const student = this.studentRepo.create({
      ...studentInfo,
      admin: admin,
    });

    const savedStudent = await this.studentRepo.save(student);
    return savedStudent;
  }

  async updateStudent(
    updateStudentInfo: UpdateStudentDto,
    id: number,
    adminId: number,
  ) {
    const whereCondition = {
      id,
      admin: { id: adminId },
    };

    const result = await this.studentRepo.update(
      whereCondition,
      updateStudentInfo,
    );

    if (!result.affected) {
      throw new NotFoundException('업데이트가 실행되지 않았습니다.');
    }

    return this.studentRepo.findOne({ where: whereCondition });
  }

  async findAllStudent(adminId: number) {
    const allStudent = await this.studentRepo.find({
      where: { admin: { id: adminId } },
    });

    if (!allStudent) {
      throw new NotFoundException('데이터를 추가하지 않았습니다.');
    }

    return allStudent;
  }

  async findOneStudent(id: number, adminId: number) {
    const oneStudent = await this.studentRepo.findOneBy({
      id,
      admin: { id: adminId },
    });

    if (!oneStudent) {
      throw new NotFoundException('찾고자 하는 학생이 없습니다.');
    }

    return oneStudent;
  }

  // 멀티테넌시를 위한 baseQuery
  // 이제 모든 queryBuilder는 baseSutdentQuery부터 시작해야한다. -> admin를 where로 걸러내는게 첫 번쨰
  private baseStudentQuery(adminId: number) {
    return this.studentRepo
      .createQueryBuilder('student')
      .leftJoin('student.admin', 'admin')
      .where('admin.id = :adminId', { adminId: adminId });
  }

  // 실제 프론트와 연동하는 Service
  async updateStudentAndCourse(
    stuId: number,
    adminId: number,
    stuInfo: UpdateStudentDto,
  ) {
    const student = await this.studentRepo.findOne({
      where: { id: stuId, admin: { id: adminId } },
      relations: ['enrollments', 'enrollments.course'],
    });

    if (!student) {
      throw new NotFoundException();
    }

    Object.assign(student, stuInfo);
    await this.studentRepo.save(student);

    if (stuInfo.courseIds) {
      const vaildCourses = await this.courseRepo.find({
        where: {
          id: In(stuInfo.courseIds.map(Number)),
          admin: { id: adminId },
        },
      });

      if (vaildCourses.length !== stuInfo.courseIds.length) {
        throw new ForbiddenException('다른 관리자의 course가 포함되었습니다.');
      }

      await this.enrollRepo.delete({
        student: { id: student.id },
        admin: { id: adminId },
      });

      const enrollments = vaildCourses.map((course) => {
        return this.enrollRepo.create({
          student,
          course,
          admin: { id: adminId },
        });
      });

      await this.enrollRepo.save(enrollments);
    }

    return await this.studentRepo.findOne({
      where: { id: stuId, admin: { id: adminId } },
      relations: ['enrollments', 'enrollments.course'],
    });
  }

  async deleteOneStudent(id: number, adminId: number) {
    const result = await this.studentRepo.delete({
      id,
      admin: { id: adminId },
    });

    if (result.affected === 0) {
      throw new NotFoundException('삭제하고자 하는 학생이 없습니다.');
    }

    return { message: '삭제 완료' };
  }

async searchStudentsService(dto: SearchStudentDto, adminId: number) {


  const {
    name,
    phone,
    course,
    page = 1,
    limit = 10,
    order = 'DESC',
    sort = 'createdAt',
  } = dto;

  // ✅ 정렬 안전 처리
  const allowedSort = ['name', 'age', 'createdAt'];
  const sortField = allowedSort.includes(sort) ? sort : 'createdAt';
  const sortOrder = order === 'ASC' ? 'ASC' : 'DESC';

  // 🔥 1️⃣ 학생만 조회 (핵심)
  const baseQuery = this.baseStudentQuery(adminId);

  // ✅ 이름 필터
  if (name) {
    baseQuery.andWhere('student.name LIKE :name', {
      name: `%${name}%`,
    });
  }

  // ✅ 전화번호 필터
  if (phone) {
    baseQuery.andWhere('student.phone LIKE :phone', {
      phone: `%${phone}%`,
    });
  }

  // 🔥 course 필터 (서브쿼리로 안전하게)
  if (course) {
    baseQuery
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('enrollment.studentId')
          .from('enrollment', 'enrollment')
          .leftJoin('enrollment.course', 'course')
          .where('course.name LIKE :course')
          .getQuery();

        return `student.id IN ${subQuery}`;
      })
      .setParameter('course', `%${course}%`);
  }

  // ✅ 정렬 + 페이지네이션
  baseQuery.orderBy(`student.${sortField}`, sortOrder);
  baseQuery.skip((page - 1) * limit).take(limit);

  // 🔥 실행 (정확한 total 보장)
  const [students, total] = await baseQuery.getManyAndCount();

  // 🔥 2️⃣ course 따로 조회
  const studentIds = students.map((s) => s.id);

  let courseMap = new Map<number, any[]>();

  if (studentIds.length > 0) {
   const enrollments = await this.enrollRepo.find({
  where: {
    student: { id: In(studentIds) },
    admin: { id: adminId },
  },
  relations: ['course', 'student'], // 👈 핵심
});

    for (const e of enrollments) {
      if (!courseMap.has(e.student.id)) {
        courseMap.set(e.student.id, []);
      }

      courseMap.get(e.student.id)!.push({
        id: e.course.id,
        name: e.course.name,
        description: e.course.description,
      });
    }
  }

  // 🔥 3️⃣ 최종 데이터 가공
  const refined = students.map((s) => ({
    id: s.id,
    name: s.name,
    age: s.age,
    email: s.email,
    memo: s.memo,
    phone: s.phone,
    pPhone: s.pPhone,
    courses: courseMap.get(s.id) ?? [],
  }));

  // ✅ 반환
  return {
    data: refined,
    total,
    page,
    lastPage: Math.ceil(total / limit),
  };
}

 async createCombinedStudentService(
  stuInfo: CreateCombinedDto,
  adminId: number,
) {
  // 1️⃣ 학생 생성
  const student = await this.studentRepo.save({
    name: stuInfo.name,
    age: stuInfo.age,
    email: stuInfo.email,
    memo: stuInfo.memo,
    phone: stuInfo.phone,
    pPhone: stuInfo.pPhone,
    admin: { id: adminId },
  });

  // 2️⃣ course 검증 (핵심 🔥)
  if (stuInfo.courses?.length) {
    const courseIds = stuInfo.courses.map(Number);

    const validCourses = await this.courseRepo.find({
      where: {
        id: In(courseIds),
        admin: { id: adminId },
      },
    });

    // ❗ 다른 admin 데이터 포함되면 차단
    if (validCourses.length !== courseIds.length) {
      throw new ForbiddenException('잘못된 course 요청');
    }

    // 3️⃣ enroll 생성 (검증된 것만 사용)
    const enrollments = validCourses.map((course) =>
      this.enrollRepo.create({
        student,
        course,
        admin: { id: adminId },
      }),
    );

    await this.enrollRepo.save(enrollments);
  }

  return student;
}
}
