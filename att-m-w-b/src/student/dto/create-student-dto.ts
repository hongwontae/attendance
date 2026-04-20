import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @Transform(({ value }) => value === '' ? null : value)
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  age?: number | null;

  @IsOptional()
@Transform(({ value }) => {
  if (value == null) return value;

  if (typeof value !== 'string') return value;

  let phone = value.replace(/\D/g, '');

  if (phone.startsWith('82')) {
    phone = '0' + phone.slice(2);
  }

  return phone;
})
  @IsMobilePhone('ko-KR')
  phone?: string | null;

  @IsOptional()
 @Transform(({ value }) => {
  if (value == null) return value;

  if (typeof value !== 'string') return value;

  let phone = value.replace(/\D/g, '');

  if (phone.startsWith('82')) {
    phone = '0' + phone.slice(2);
  }

  return phone;
})
  @IsMobilePhone('ko-KR')
  pPhone?: string | null;

  @Transform(({ value }) => value === '' ? null : value)
  @IsEmail()
  @IsOptional()
  email?: string | null;

  @Transform(({ value }) => value === '' ? null : value)
  @IsString()
  @IsOptional()
  memo?: string | null;
}
