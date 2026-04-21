import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsOptional,
  IsString,
} from 'class-validator';
import { EmptyToNull } from 'src/decorator/empty-to-null';

export class CreateCombinedDto {

  @IsString()
  name: string;

  @Transform(({value})=>{
    if(value === '') return null;
    if(value == null) return null;
    return Number(null);
  })
  @IsInt()
  @IsOptional()
  age?: number | null;

  @IsEmail()
  @IsOptional()
  @EmptyToNull()
  email?: string | null;

  @IsOptional()
  @Transform(({ value }) => {
    if (value == null) return value; 
    if(value === '') return null;

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
    if (value == null) return value;
    if(value == '') return null;

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
  @IsOptional()
  @EmptyToNull()
  memo?: string | null;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  courses?: number[] | null;
}
