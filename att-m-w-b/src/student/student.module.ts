import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports : [TypeOrmModule.forFeature([StudentEntity]), AdminModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports : [StudentService]
})
export class StudentModule {}
