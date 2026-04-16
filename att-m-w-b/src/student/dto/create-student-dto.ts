import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStudentDto {

    // pipe 설정에서 whilelist : true -> @Type 동작
    // pipe 설정에서 transform : true -> DTO에 없는 값 제거
    
    @IsString()
    name : string;

    @Type(()=>Number)
    @IsNumber()
    adminId : number;

    @Type(()=>Number)
    @IsOptional()
    @IsNumber()
    age? : number;

    @IsString()
    @IsOptional()
    phone? : string;

    @IsString()
    @IsOptional()
    pPhone? : string;

    @IsEmail()
    @IsOptional()
    email? : string;

    @IsString()
    @IsOptional()
    memo? : string;
}