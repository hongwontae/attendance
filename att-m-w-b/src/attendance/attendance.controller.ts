import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttDto } from './dto/CreateAtt.dto';

@Controller('attendance')
export class AttendanceController {

    constructor(private readonly attService : AttendanceService){}

    @Post('create/att')
    @UsePipes(new ValidationPipe({whitelist : true, transform : true}))
    async createAttendance(@Body() body : CreateAttDto){
        return await this.attService.createAttend(body, 1);
    }


}
