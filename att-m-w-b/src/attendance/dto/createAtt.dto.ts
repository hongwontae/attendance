import { IsDateString, IsEnum, IsNumber } from "class-validator";
import { AttendanceStatus } from "../attendance.entity";
import { Type } from "class-transformer";

export class CreateAttDto {

    @IsNumber()
    @Type(()=>Number)
    studentId : number;

    @IsNumber()
    @Type(()=>Number)
    courseId : number;

    @IsDateString()
    date : string;

    @IsEnum(AttendanceStatus)
    status : AttendanceStatus

}