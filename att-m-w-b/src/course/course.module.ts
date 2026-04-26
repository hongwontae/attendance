import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { AdminModule } from 'src/admin/admin.module';
import { EnrollmentEntity } from 'src/enrollment/enrollment.entity';
import { StudentEntity } from 'src/student/student.entity';

@Module({
    imports : [AdminModule, TypeOrmModule.forFeature([CourseEntity, EnrollmentEntity, StudentEntity])],
    controllers : [CourseController],
    providers : [CourseService],
    exports : [CourseService]
})
export class CourseModule {}
