import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import {CreateAttDto} from './dto/create-att.dto';
import { CourseAndDateDto } from './dto/course-date.dto';
import {StudentDto} from './dto/student.dto';

@Controller('attendance')
export class AttendanceController {

    constructor(private readonly attService : AttendanceService){}

    @Post('create/att')
    @UsePipes(new ValidationPipe({whitelist : true, transform : true}))
    async createAttendance(@Body() body : CreateAttDto){
        return await this.attService.createAttend(body, 1);
    }

    // 한 명의 학생 출석율
    @Get('find/one/:studentId')
    async studentAtt(@Param('studentId', ParseIntPipe) studentId : number){
        return this.attService.studentAtt(studentId, 1)
    }


    // 특정 수업에 대한 한 명의 학생의 출석율
    @Post('one/student')
    @UsePipes(new ValidationPipe({whitelist : true, transform : true}))
    async findOneStudentAtt(@Body() body : StudentDto){
        return await this.attService.findOnlyOneStudentAtt(body.courseId, body.studentId,1)
    }


}
