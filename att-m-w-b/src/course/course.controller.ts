import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentAdmin } from 'src/decorator/current-admin';
import { plainToInstance } from 'class-transformer';
import { ResponseShowCourseDto } from './dto/res-dto/response-show-course-dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('save')
  async createCourse(@Body() body: CreateCourseDto) {
    return await this.courseService.createCourse(body, 1);
  }

  @Patch('update/:id')
  async updateCourse(
    @Body() body: UpdateCourseDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.courseService.updateCourse(body, id, 1);
  }


  @Get('one/:id')
  async findOneCourse(@Param('id', ParseIntPipe) id: number) {
    return await this.courseService.findOneCourse(id, 1);
  }

  @Get('detail/:id')
  async detailFindOneCourse(@Param('id', ParseIntPipe) id: number) {
    return await this.courseService.detailCourse(id);
  }

  @Delete('remove/:id')
  async deleteOneCourse(@Param('id', ParseIntPipe) id: number) {
    return await this.courseService.deleteCourse(id, 2);
  }

  @Get('detail/all/:id')
  @UseGuards(AuthGuard('jwt'))
  async findCourseAndStuAndAtt(
    @Param('id', ParseIntPipe) id: number,
    @CurrentAdmin() adminId: number,
  ) {
   return await this.courseService.findCourAndStuAndAtt(adminId, id);
  }



  // 실제 브라우저와 연동하는 Controller
  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  async findAllCourse(@CurrentAdmin() adminId: number) {
    const result =  await this.courseService.findAllCourse(adminId);
    console.log(result);
    return plainToInstance(ResponseShowCourseDto, result);
  }

  @Get('detail/one/:id')
  @UseGuards(AuthGuard('jwt'))
  async findOneCourseAndStudent(
    @Param('id', ParseIntPipe) courseId : number,
    @CurrentAdmin() adminId : number
  ){
    return await this.courseService.findOneCourseAndStu(courseId, adminId)
  }


}
