import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttDto } from './dto/create-att.dto';

@Controller('attendance')
export class AttendanceController {

    constructor(private readonly attService : AttendanceService){}

    @Post('create')
    @UsePipes(new ValidationPipe({whitelist : true, transform : true}))
    async createAtt(@Body() body : CreateAttDto,){
        return await this.attService.createAtt(body, 1)
    }
    
    @Delete('remove')
    async deleteRemove(){
        return await this.attService.removeAll();
    }


}
