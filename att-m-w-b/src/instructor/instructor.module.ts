import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorEntity } from './instructor.entity';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { AdminModule } from 'src/admin/admin.module';

@Module({
    imports : [TypeOrmModule.forFeature([InstructorEntity]), AdminModule],
    controllers : [InstructorController],
    providers : [InstructorService],
    exports : [InstructorService]
})
export class InstructorModule {}
