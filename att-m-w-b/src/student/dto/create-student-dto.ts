import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsInt()
  adminId: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    let phone = value.replace(/\D/g, '');

    if (phone.startsWith('82')) {
      phone = '0' + phone.slice(2);
    }

    return phone;
  })
  @IsMobilePhone('ko-KR')
  phone?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    let phone = value.replace(/\D/g, '');

    if (phone.startsWith('82')) {
      phone = '0' + phone.slice(2);
    }

    return phone;
  })
  @IsMobilePhone('ko-KR')
  pPhone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  memo?: string;
}
