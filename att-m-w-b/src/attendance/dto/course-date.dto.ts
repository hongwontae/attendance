import { Type } from "class-transformer";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CourseAndDateDto {

    @IsNumber()
    @Type(()=>Number)
    courseId : number;

    @IsDateString()
    date : string;


}