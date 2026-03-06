import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { AdminEntity } from './admin/admin.entity';
import { StudentEntity } from './student/student.entity';
import { CourseEntity } from './course/course.entity';
import { AttendanceModule } from './attendance/attendance.module';
import { AttendanceEntity } from './attendance/attendance.entity';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot({
      type : 'sqlite',
      database : 'db.sqlite',
      entities : [AdminEntity, StudentEntity, CourseEntity, AttendanceEntity],
      synchronize : true,
      autoLoadEntities : true
    })
    , AdminModule, StudentModule, CourseModule, AttendanceModule, AuthModule, EnrollmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
