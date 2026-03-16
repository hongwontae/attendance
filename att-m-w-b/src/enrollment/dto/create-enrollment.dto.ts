import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateEnrollmentDto {

    @IsNumber()
    @Type(()=>Number)
    studentId : number;

    @IsNumber()
    @Type(()=>Number)
    courseId : number;

    @IsNumber()
    @Type(()=>Number)
    adminId : number;




}