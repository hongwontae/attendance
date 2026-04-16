import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCombinedDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  phone: string;

  @IsString()
  pPhone?: string;

  @IsString()
  memo?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(()=>Number)
  courses?: number[];
}
