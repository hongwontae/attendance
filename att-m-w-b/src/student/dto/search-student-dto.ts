import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SearchStudentDto {
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  name?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  course?: string;

  @IsOptional()
  sort?: string;

  @IsOptional()
  order?: 'ASC' | 'DESC';
}
