import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCombinedDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  age?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

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

  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    let phone = value.replace(/\D/g, '');

    if (phone.startsWith('82')) {
      phone = '0' + phone.slice(2);
    }

    return phone;
  })
  @IsMobilePhone('ko-KR')
  @IsOptional()
  pPhone?: string;

  @IsString()
  memo?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  courses?: number[];
}
