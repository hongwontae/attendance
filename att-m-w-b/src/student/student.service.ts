import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { ILike, In, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student-dto';
import { UpdateStudentDto } from './dto/update-student-dto';
import { AdminService } from 'src/admin/admin.service';
import { GetStudentDto } from './dto/get-student-dto';
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

  // 브라우저에서 기능하는 Service
  async findStudentAndCourse(query: GetStudentDto, adminId: number) {
    const { limit, page, keyword } = query;

      const whereCondition = keyword
    ? {
        admin: { id: adminId },
        name: ILike(`%${keyword}%`),
      }
    : {
        admin: { id: adminId },
      };

    const [data, total] = await this.studentRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'ASC',
      },
      relations: ['enrollments', 'enrollments.course'],
      where: whereCondition,
    });

    const refineStuAndCou = data.map(
      ({ id, name, age, email, memo, phone, pPhone, enrollments }) => {
        return {
          id,
          name,
          age,
          email,
          memo,
          phone,
          pPhone,
          courses: (enrollments ?? []).map(({ course }) => {
            return {
              id: course.id,
              name: course.name,
              description: course.description,
            };
          }),
        };
      },
    );
    return {
      data: refineStuAndCou,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

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
      await this.enrollRepo.delete({ student: { id: student.id } });

      const enrollments = stuInfo.courseIds.map((id) => {
        return this.enrollRepo.create({
          student,
          course: { id },
          admin: { id: adminId },
        });
      });

      await this.enrollRepo.save(enrollments);
    }

    return this.studentRepo.findOne({
      where: { id: stuId },
      relations: ['enrollments', 'enrollments.course'],
    });
  }

  async deleteOneStudent(id: number, adminId: number) {
    const oneStudent = await this.studentRepo.findOneBy({
      id,
      admin: { id: adminId },
    });

    if (!oneStudent) {
      throw new NotFoundException('삭제하고자 하는 학생이 없습니다.');
    }

    return await this.studentRepo.remove(oneStudent);
  }

async searchStudentsService(dto: SearchStudentDto) {
  const {
    name,
    phone,
    course,
    page = 1,
    limit = 10,
    order = "DESC",
    sort = "createdAt",
  } = dto;

  const query = this.studentRepo
    .createQueryBuilder("student")
    .leftJoinAndSelect("student.enrollments", "enrollment")
    .leftJoinAndSelect("enrollment.course", "course");

  // ✅ 필터
  if (name) {
    query.andWhere("student.name LIKE :name", {
      name: `%${name}%`,
    });
  }

  if (phone) {
    query.andWhere("student.phone LIKE :phone", {
      phone: `%${phone}%`,
    });
  }

  if (course) {
    query.andWhere("course.name LIKE :course", {
      course: `%${course}%`,
    });
  }

  // 🔥 ✅ 여기 넣는다 (핵심)
  const allowedSort = ["name", "age", "createdAt"];

  const sortField = allowedSort.includes(sort) ? sort : "createdAt";
  const sortOrder = order === "ASC" ? "ASC" : "DESC";
  console.log(sortOrder);

  query.orderBy(`student.${sortField}`, sortOrder);

  // ✅ 페이지네이션 (정렬 이후)
  query.skip((page - 1) * limit).take(limit);

  const [students, total] = await query.getManyAndCount();

  const refined = students.map(
    ({ id, name, age, email, memo, phone, pPhone, enrollments }) => ({
      id,
      name,
      age,
      email,
      memo,
      phone,
      pPhone,
      courses: (enrollments ?? []).map(({ course }) => ({
        id: course.id,
        name: course.name,
        description: course.description,
      })),
    })
  );

  return {
    data: refined,
    total,
    page,
    lastPage: Math.ceil(total / limit),
  };
}

  async createCombinedStudentService(stuInfo : CreateCombinedDto, adminId : number){
    const student = await this.studentRepo.save({
      name : stuInfo.name,
      age : stuInfo.age,
      email : stuInfo.email,
      memo : stuInfo.memo,
      phone : stuInfo.phone,
      pPhone : stuInfo.pPhone,
      admin : {id : adminId}
    });

      if(stuInfo.courses?.length){
          const enrollments = stuInfo.courses.map((id)=>{
            return {
              student : {id : student.id},
              course : {id : Number(id)},
              admin : {id : adminId}
            }
          })
          return this.enrollRepo.save(enrollments);
      }
   

      return student;

  }

}
