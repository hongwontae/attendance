import { IsEnum, IsInt, IsString } from "class-validator";
import { AttendanceStatus } from "../attendance.entity";
import { Type } from "class-transformer";


export class CreateTestAttDto {


    @IsEnum(AttendanceStatus)
    status : AttendanceStatus

    @IsInt()
    @Type(()=>Number)
    courseId : number;

    @IsInt()
    @Type(()=>Number)
    studentId : number;

    @IsString()
    date : string;


}