import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStudentDto {
    
    @IsString()
    name : string;

    @Type(()=>Number)
    @IsInt()
    adminId : number;

    @Type(()=>Number)
    @IsOptional()
    @IsInt()
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