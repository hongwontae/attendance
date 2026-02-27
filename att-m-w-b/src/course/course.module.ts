import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { AdminModule } from 'src/admin/admin.module';

@Module({
    imports : [AdminModule, TypeOrmModule.forFeature([CourseEntity])],
    controllers : [CourseController],
    providers : [CourseService],
    exports : [CourseService]
})
export class CourseModule {}
