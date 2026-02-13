import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student-dto';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student-dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('save')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createStudent(@Body() body: CreateStudentDto) {
    const stu = await this.studentService.createStudent(body);
    return stu;
  }

  // params -> 라우트 경로에 포함되어 있어야 @Param('id')로 인식가능해집니다.
  @Patch('update/:id')
  @UsePipes(new ValidationPipe({whitelist : true, transform : true}))
  async updateStudent(@Param('id', ParseIntPipe) id : number, @Body() body : UpdateStudentDto){
    const upStu = await this.studentService.updateStudent(body, id);
    return upStu
  }

  @Get('all')
  async findAllStudent(){
    const allStu = await this.studentService.findAllStudent();
    return allStu;
  }

  @Get('one/:id')
  async findOneStudent(@Param('id', ParseIntPipe) id : number){
    return await this.studentService.findOneStudent(id);
  }

  @Delete('remove/:id')
  async deleteOneStudent(@Param('id', ParseIntPipe) id : number){
      const deleteOneStu = await this.studentService.deleteOneStudnet(id);
      return deleteOneStu;
  }

}
