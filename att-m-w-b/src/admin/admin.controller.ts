import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService : AdminService){}

    @Post('/secure')
    @UsePipes(new ValidationPipe({transform : true, whitelist : true}))
    async createAdmin(@Body() adminInfo : CreateAdminDto){
        const adminOne = await this.adminService.createAdmin(adminInfo);
        return adminOne;
    }

}
