import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Controller('enrollment')
export class EnrollmentController {

    constructor(
        private readonly enrollmentService : EnrollmentService
    ){}


    @Post('enroll/create')
    @UsePipes(new ValidationPipe({whitelist : true, transform : true}))
    async registerEnroll(@Body() body : CreateEnrollmentDto){

        return await this.enrollmentService.enroll(body.studentId, body.courseId, body.adminId)

    }  


}
