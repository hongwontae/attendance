import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {

    @IsString()
    name : string;

    @IsString()
    @IsOptional()
    description? : string | null;

    @IsDateString()
    @IsOptional()
    startDate? : string | null;

    @IsDateString()
    @IsOptional()
    endDate? : string | null;


}