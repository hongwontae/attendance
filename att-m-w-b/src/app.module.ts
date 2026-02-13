import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { AdminEntity } from './admin/admin.entity';
import { StudentEntity } from './student/student.entity';
import { CourseEntity } from './course/course.entity';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : 'sqlite',
      database : 'db.sqlite',
      entities : [AdminEntity, StudentEntity, CourseEntity],
      synchronize : true
    })
    , AdminModule, StudentModule, CourseModule, AttendanceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
