import { Type } from "class-transformer";
import { IsDateString, IsNumber } from "class-validator";

export class StudentDto {
 
    
    @IsNumber()
    @Type(()=>Number)
    courseId : number;

    @IsNumber()
    @Type(()=>Number)
    studentId : number;



}