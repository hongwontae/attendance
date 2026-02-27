import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceEntity } from './attendance.entity';
import { Repository } from 'typeorm';
import { CreateAttDto } from './dto/CreateAtt.dto';
import { StudentService } from 'src/student/student.service';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class AttendanceService {

    constructor(
        @InjectRepository(AttendanceEntity) private readonly attRepo : Repository<AttendanceEntity>,
        private readonly studentService : StudentService,
        private readonly courseService : CourseService
    ){}

    async createAttend(body : CreateAttDto, adminId : number){

        const correctStudent = await this.studentService.findOneStudent(body.studentId, adminId);
        const correctCourse = await this.courseService.findOneCourse(body.courseId, adminId);
        

    }

}
