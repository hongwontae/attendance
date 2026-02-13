import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {

    constructor(private readonly courseService : CourseService){}


    @Post('save')
    @UsePipes(new ValidationPipe({whitelist : true, transform : true}))
    async createCourse(@Body() body : CreateCourseDto){
        return await this.courseService.createCourse(body);
    }

    @Patch('update/:id')
    @UsePipes(new ValidationPipe({whitelist : true, transform : true}))
    async updateCourse(@Body() body : UpdateCourseDto,@Param('id',ParseIntPipe) id : number){
        return await this.courseService.updateCourse(body, id);
    }

    @Get('all')
    async findAllCourse(){
        return await this.courseService.findAllCourse();
    }

    @Get('one/:id')
    async findOneCourse(@Param('id', ParseIntPipe) id : number){
        return await this.courseService.findOneCourse(id);
    }

    @Delete('remove/:id')
    async deleteOneCourse(@Param('id', ParseIntPipe) id : number){
        return await this.courseService.deleteCourse(id);
    }

}
