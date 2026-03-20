import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from './attendance.entity';
import { StudentModule } from 'src/student/student.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports : [TypeOrmModule.forFeature([AttendanceEntity])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports : [AttendanceService]
})
export class AttendanceModule {}
