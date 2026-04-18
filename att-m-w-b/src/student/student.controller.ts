import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student-dto';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student-dto';
import { CreateCombinedDto } from './dto/create-combined-dto';
import { SearchStudentDto } from './dto/search-student-dto';
import { CurrentAdmin } from 'src/decorator/current-admin';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('save')
  async createStudent(@Body() body: CreateStudentDto) {
    const stu = await this.studentService.createStudent(body);
    return stu;
  }

  @Patch('update/:id')
  async updateStudent(@Param('id', ParseIntPipe) id : number, @Body() body : UpdateStudentDto){
    const upStu = await this.studentService.updateStudentAndCourse(id, 1, body);
    return upStu
  }

  @Get('all')
  async findAllStudent(){
    const allStu = await this.studentService.findAllStudent(1);
    return allStu;
  }

  @Get('one/:id')
  async findOneStudent(@Param('id', ParseIntPipe) id : number){
    return await this.studentService.findOneStudent(id, 1);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('remove/:id')
  async deleteOneStudent(@Param('id', ParseIntPipe) id : number, @CurrentAdmin() adminId : number){
      const deleteOneStu = await this.studentService.deleteOneStudent(id, adminId);
      return deleteOneStu;
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('/search')
  async searchStudents(@Query() query : SearchStudentDto, @CurrentAdmin() adminId : number){
    console.log(adminId);
    console.log('search controller');
    return await this.studentService.searchStudentsService(query, adminId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/combined/create')
  async createCombinedStudent(@Body() body : CreateCombinedDto, @CurrentAdmin() adminId : number){
      return await this.studentService.createCombinedStudentService(body, adminId)
  }

}
