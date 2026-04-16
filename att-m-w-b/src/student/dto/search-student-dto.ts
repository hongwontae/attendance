import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class SearchStudentDto {
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  course?: string;

  @IsOptional()
  @IsString()
  @IsIn(['name', 'age', 'createdAt'])
  sort?: string;

  @IsOptional()
  @IsString()
  @IsIn(["ASC", "DESC"])
  order?: 'ASC' | 'DESC';
}
