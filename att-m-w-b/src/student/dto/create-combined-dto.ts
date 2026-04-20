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
  age?: number | null;

  @IsEmail()
  @IsOptional()
  email?: string | null;

  @IsOptional()
  @Transform(({ value }) => {
    if (value == null) return value; // null + undefined

    if (typeof value !== 'string') return value;

    let phone = value.replace(/\D/g, '');

    if (phone.startsWith('82')) {
      phone = '0' + phone.slice(2);
    }

    return phone;
  })
  @IsMobilePhone('ko-KR')
  phone?: string | null;

  @Transform(({ value }) => {
    if (value == null) return value; // null + undefined

    if (typeof value !== 'string') return value;

    let phone = value.replace(/\D/g, '');

    if (phone.startsWith('82')) {
      phone = '0' + phone.slice(2);
    }

    return phone;
  })
  @IsMobilePhone('ko-KR')
  @IsOptional()
  pPhone?: string | null;

  @IsString()
  memo?: string | null;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  courses?: number[] | null;
}
