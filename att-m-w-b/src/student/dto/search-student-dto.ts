import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsMobilePhone,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

enum SortField {
  NAME = 'name',
  AGE = 'age',
  CREATED_AT = 'createdAt',
}

enum OrderField {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SearchStudentDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    let phone = value.replace(/\D/g, '');

    if (phone.startsWith('82')) {
      phone = '0' + phone.slice(2);
    }

    return phone;
  })
  phone?: string;

  @IsOptional()
  @IsString()
  course?: string;

  @IsOptional()
  @IsString()
  @IsEnum(SortField)
  sort?: string = SortField.CREATED_AT;

  @IsOptional()
  @IsString()
  @IsEnum(OrderField)
  order?: OrderField = OrderField.ASC;
}
