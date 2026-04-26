import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AdminService } from 'src/admin/admin.service';
import { EnrollmentEntity } from 'src/enrollment/enrollment.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepo: Repository<CourseEntity>,
    private readonly adminService: AdminService,
    @InjectRepository(EnrollmentEntity)
    private readonly enrollRepo: Repository<EnrollmentEntity>,
  ) {}

  async createCourse(courseInfo: CreateCourseDto, adminId: number) {
    const oneCourse = this.courseRepo.create({
      ...courseInfo,
      admin: { id: adminId },
    });

    if (!oneCourse) {
      throw new NotFoundException('생성되지 않았습니다.');
    }

    return await this.courseRepo.save(oneCourse);
  }

  async updateCourse(
    updateCourseInfo: UpdateCourseDto,
    id: number,
    adminId: number,
  ) {
    const whenCondition = {
      id: id,
      admin: { id: adminId },
    };

    const findCourse = await this.courseRepo.update(
      whenCondition,
      updateCourseInfo,
    );

    if (!findCourse.affected) {
      throw new NotFoundException('수업 내용이 변경되지 않았습니다.');
    }

    return await this.courseRepo.findOneBy(whenCondition);
  }

  async findOneCourse(id: number, adminId: number) {
    const oneCourse = await this.courseRepo.findOneBy({
      id,
      admin: { id: adminId },
    });

    if (!oneCourse) {
      throw new NotFoundException('찾고자 하는 수업이 등록되지 않았습니다.');
    }

    return oneCourse;
  }

  async deleteCourse(id: number, adminId: number) {
    const oneCourse = await this.courseRepo.findOneBy({
      id,
      admin: { id: adminId },
    });

    if (!oneCourse) {
      throw new NotFoundException('삭제하고자 하는 수업이 존재하지 않습니다.');
    }

    return await this.courseRepo.remove(oneCourse);
  }

  async detailCourse(id: number) {
    return await this.courseRepo.findOne({
      where: { id },
      relations: [
        'enrollments',
        'enrollments.student',
        'enrollments.attendances',
      ],
    });
  }

  async findCourAndStuAndAtt(adminId: number, courseId: number) {
    return await this.enrollRepo
      .createQueryBuilder('enrollment')
      .innerJoin('enrollment.course', 'course')
      .innerJoin('enrollment.student', 'student')
      .leftJoin('enrollment.attendances', 'attendance')
      .where('course.id = :courseId', { courseId })
      .andWhere('course.adminId = :adminId', { adminId }) // 🔥 멀티테넌시 핵심
      .select([
        'student.id AS studentId',
        'student.name AS name',
        'COUNT(attendance.id) AS total',
        `SUM(CASE WHEN attendance.status = 'present' THEN 1 ELSE 0 END) AS presentCount`,
      ])
      .groupBy('student.id')
      .addGroupBy('student.name')

      .getRawMany();
  }

  // 실제 브라우저와 연계되는 Service

  async findAllCourse(adminId: number) {
    const data = await this.courseRepo
      .createQueryBuilder('c')
      .leftJoin('c.enrollments', 'e')
      .leftJoin('c.instructor', 'i')
      .where('c.adminId = :adminId', { adminId })
      .select([
        'c.id',
        'c.name',
        'c.instructor',
        'c.description',
        'c.startDate',
        'c.endDate',
        'i.name',
      ])
      .addSelect('COUNT(e.id)', 'enrollmentsLength')
      .groupBy('c.id')
      .getRawMany();

    console.log(data);

    return data.map((item) => {
      return {
        id: item.c_id,
        name: item.c_name,
        instructor: item.i_name,
        description: item.c_description,
        startDate: item.c_startDate,
        endDate: item.c_endDate,
        enrollmentsLength: Number(item.enrollmentsLength),
      };
    });
  }

  async findOneCourseAndStu(courseId: number, adminId: number) {
    const findCourse = await this.courseRepo.findOneBy({
      id: courseId,
      admin: { id: adminId },
    });

    const findStudent = await this.enrollRepo.find({
      where: { admin: { id: adminId }, course: { id: courseId } },
      relations : ['student']
    });

    return {
      course : findCourse,
      students : findStudent,
    }
  }
}
