import {PartialType} from '@nestjs/mapped-types'
import { CreateStudentDto } from './create-student-dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {

    @IsOptional()
    @IsNumber({}, {each : true})
    courseIds? : number[]
};