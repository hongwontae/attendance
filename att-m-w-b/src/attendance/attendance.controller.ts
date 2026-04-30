import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CurrentAdmin } from 'src/decorator/current-admin';
import { CreateAttDto } from './dto/create-att.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateTestAttDto } from './dto/test.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attService: AttendanceService) {}

  // Test
  @Post('test/make/att')
  @UseGuards(AuthGuard('jwt'))
  async testMakeAtt(
    @Body() body: CreateTestAttDto,
    @CurrentAdmin() adminId: number,
  ) {
    const { courseId, date, status, studentId } = body;
    const result = await this.attService.testMakeAttendance(
      adminId,
      courseId,
      studentId,
      status,
      date,
    );
    console.log(result);
    return result;
  }

  @Get('/test/recent/att')
  @UseGuards(AuthGuard('jwt'))
  async findRecentAtt(
    @CurrentAdmin() adminId: number,
    @Query('courseId', ParseIntPipe) courseId: number,
    @Query('studentId', ParseIntPipe) studentId: number,
  ) {
    const result = await this.attService.findRecentAttendances(adminId, courseId, studentId);
    console.log(result);
    return result;
  }

  // 실제 브라우저와 연동하는 Controller
  @Post('make/att')
  @UseGuards(AuthGuard('jwt'))
  async makeAtt(@CurrentAdmin() adminId: number, @Body() body: CreateAttDto) {
    const { courseId, status, studentId } = body;

    const result = await this.attService.makeAttendance(
      adminId,
      courseId,
      studentId,
      status,
    );
    console.log(result);
    return result;
  }
}
