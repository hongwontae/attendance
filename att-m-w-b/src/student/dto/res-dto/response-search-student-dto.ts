import { Transform, Type } from 'class-transformer';

export class CourseDto {
  id: number;
  name: string;
  description: string;
}

export class StudentResponseDto {
  id: number;
  name: string;
  age?: number;
  email?: string;
  memo?: string;

  @Transform(({ value }) => {
    if (!value) return value;
    return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }, { toPlainOnly: true }) // 🔥 핵심
  phone?: string;

  @Transform(({ value }) => {
    if (!value) return value;
    return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }, { toPlainOnly: true })
  pPhone?: string;

  @Type(() => CourseDto) // 🔥 배열 내부 DTO 변환
  courses?: CourseDto[];
}

export class StudentListResponseDto {
  @Type(() => StudentResponseDto)
  data: StudentResponseDto[];

  total: number;
  page: number;
  lastPage: number;
}
