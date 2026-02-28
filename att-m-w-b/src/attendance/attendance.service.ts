import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceEntity } from './attendance.entity';
import { Repository } from 'typeorm';
import { CreateAttDto } from './dto/create-att.dto';
import { StudentService } from 'src/student/student.service';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly attRepo: Repository<AttendanceEntity>,
    private readonly studentService: StudentService,
    private readonly courseService: CourseService,
  ) {}

  async createAttend(body: CreateAttDto, adminId: number) {
    const correctStudent = await this.studentService.findOneStudent(
      body.studentId,
      adminId,
    );
    const correctCourse = await this.courseService.findOneCourse(
      body.courseId,
      adminId,
    );

    if (!correctStudent) {
      throw new NotFoundException('학생이 없습니다.');
    }

    if (!correctCourse) {
      throw new NotFoundException('수업이 없습니다.');
    }

    const existing = await this.attRepo.findOneBy({
      student: { id: body.studentId },
      course: { id: body.courseId },
      date: body.date,
    });

    if (existing) {
      throw new ConflictException('같은 날 두 번 출석은 불가능합니다.');
    }

    const attendance = this.attRepo.create({
      status: body.status,
      date: body.date,
      admin: { id: adminId },
      course: { id: body.courseId },
      student: { id: body.studentId },
    });

    return await this.attRepo.save(attendance);
  }

  async studentAtt(studentId : number, adminId : number){
    return await this.attRepo.find({
      where : {student : {id : studentId}, admin : {id : adminId}}
    })
  }


  async findOnlyOneStudentAtt(courseId : number, studentId : number, adminId : number){
    return await this.attRepo.find({
      where : {
        course : {id : courseId, admin : {id : adminId}},
        student : {id : studentId, admin : {id : adminId}},
      }
    })
  }



}
