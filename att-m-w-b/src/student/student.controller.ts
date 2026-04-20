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
import { plainToInstance } from 'class-transformer';
import { StudentResponseDto } from './dto/res-dto/response-create-combined-dto';
import { StudentListResponseDto } from './dto/res-dto/response-search-student-dto';
import { UpdateStudentResponseDto } from './dto/res-dto/response-update-student-dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('save')
  @UseGuards(AuthGuard('jwt'))
  async createStudent(@Body() body: CreateStudentDto, @CurrentAdmin() adminId : number) {
    const stu = await this.studentService.createStudent(body, adminId);
    return stu;
  }

  @Get('all')
  async findAllStudent() {
    const allStu = await this.studentService.findAllStudent(1);
    return allStu;
  }

  @Get('one/:id')
  async findOneStudent(@Param('id', ParseIntPipe) id: number) {
    return await this.studentService.findOneStudent(id, 1);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('remove/:id')
  async deleteOneStudent(
    @Param('id', ParseIntPipe) id: number,
    @CurrentAdmin() adminId: number,
  ) {
    const deleteOneStu = await this.studentService.deleteOneStudent(
      id,
      adminId,
    );
    return deleteOneStu;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/search')
  async searchStudents(
    @Query() query: SearchStudentDto,
    @CurrentAdmin() adminId: number,
  ) {
    const result = await this.studentService.searchStudentsService(
      query,
      adminId,
    );
    return plainToInstance(StudentListResponseDto, result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/combined/create')
  async createCombinedStudent(
    @Body() body: CreateCombinedDto,
    @CurrentAdmin() adminId: number,
  ) {
    const student = await this.studentService.createCombinedStudentService(
      body,
      adminId,
    );
    return plainToInstance(StudentResponseDto, student, {
      excludeExtraneousValues: true,
    });
  }

  @Post('update/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStudentDto,
    @CurrentAdmin() adminId: number,
  ) {
    const upStu = await this.studentService.updateStudentAndCourse(id, adminId, body);
    return plainToInstance(UpdateStudentResponseDto, upStu, {
      excludeExtraneousValues : true
    })
  }
}
