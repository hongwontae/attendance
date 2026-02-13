import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {

    @IsString()
    name : string;

    @IsString()
    @IsOptional()
    description? : string;

    @IsDateString()
    @IsOptional()
    startDate? : string;

    @IsDateString()
    @IsOptional()
    endDate? : string;


}