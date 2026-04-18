import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCombinedDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  @Type(()=>Number)
  age?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  pPhone?: string;

  @IsString()
  memo?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(()=>Number)
  courses?: number[];
}
