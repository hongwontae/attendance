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
import { ConfigModule } from '@nestjs/config';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { EnrollmentEntity } from './enrollment/enrollment.entity';
import { InstructorModule } from './instructor/instructor.module';
import { InstructorEntity } from './instructor/instructor.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port : 3306,
      username : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      entities: [
        AdminEntity,
        StudentEntity,
        CourseEntity,
        AttendanceEntity,
        EnrollmentEntity,
        InstructorEntity,
      ],
      synchronize: false,
      autoLoadEntities: true,
      charset : 'utf8mb4',
      timezone : '+09:00'
    }),
    AdminModule,
    StudentModule,
    CourseModule,
    AttendanceModule,
    AuthModule,
    EnrollmentModule,
    InstructorModule,
  ],
})
export class AppModule {}
