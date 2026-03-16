import { IsDateString, IsEnum, IsNumber, IsString } from "class-validator";
import { AttendanceStatus } from "../attendance.entity";
import { Type } from "class-transformer";


export class CreateAttDto {

    @IsDateString()
    date : string;

    @IsEnum(AttendanceStatus)
    status : AttendanceStatus

    @IsNumber()
    @Type(()=>Number)
    enrollmentId : number;

}