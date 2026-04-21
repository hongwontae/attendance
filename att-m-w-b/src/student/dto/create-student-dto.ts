import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsOptional,
  IsString,
} from 'class-validator';
import { EmptyToNull } from 'src/decorator/empty-to-null';

export class CreateStudentDto {
  @IsString()
  name: string;

  @Transform(({value})=>{
    if(value == null) return value;
    if(value == '') return null;
    return Number(value);
  })
  @IsOptional()
  @IsInt()
  age?: number | null;

  @IsOptional()
  @Transform(({ value }) => {
    if (value == null) return value;
    if (value == '') return null;

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
    if (value == '') return null;

    let phone = value.replace(/\D/g, '');

    if (phone.startsWith('82')) {
      phone = '0' + phone.slice(2);
    }

    return phone;
  })
  @IsMobilePhone('ko-KR')
  pPhone?: string | null;

  @EmptyToNull()
  @IsEmail()
  @IsOptional()
  email?: string | null;

  @EmptyToNull()
  @IsString()
  @IsOptional()
  memo?: string | null;
}
