import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { In, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student-dto';
import { UpdateStudentDto } from './dto/update-student-dto';
import { AdminService } from 'src/admin/admin.service';
import { GetStudentDto } from './dto/get-student-dto';
import { CourseEntity } from 'src/course/course.entity';
import { EnrollmentEntity } from 'src/enrollment/enrollment.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepo: Repository<StudentEntity>,
    private readonly adminService: AdminService,
    @InjectRepository(EnrollmentEntity)
    private readonly enrollRepo : Repository<EnrollmentEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepo : Repository<CourseEntity>
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

  // 브라우저에서 기능하는 Service
  async findStudentAndCourse(query: GetStudentDto, adminId : number) {
    const { limit, page } = query;

    const [data, total] = await this.studentRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'ASC',
      },
      relations: ['enrollments', 'enrollments.course'],
      where : {admin : {id : adminId}}
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

    if(stuInfo.courseIds){
      await this.enrollRepo.delete({student : {id : student.id}})

      

      const enrollments = stuInfo.courseIds.map((id)=>{
        return this.enrollRepo.create({
          student,
          course : {id},
          admin : {id : adminId}
        })
      })

      await this.enrollRepo.save(enrollments)
    }

    return this.studentRepo.findOne({
      where : {id : stuId},
      relations : ['enrollments', 'enrollments.course']
    })



  }
}
