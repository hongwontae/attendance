import {PartialType} from '@nestjs/mapped-types'
import { CreateStudentDto } from './create-student-dto';
import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {

    @IsOptional()
    @IsInt({each : true})
    @Type(()=>Number)
    @IsArray()
    courseIds? : number[]
};