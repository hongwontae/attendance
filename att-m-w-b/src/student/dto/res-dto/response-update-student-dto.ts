import { Expose, Transform, Type } from 'class-transformer';

export class UpdateCourseResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  startDate: string;

  @Expose()
  endDate: string;
}

export class UpdateEnrollmentResponseDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UpdateCourseResponseDto)
  course?: UpdateCourseResponseDto;
}

export class UpdateStudentResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  age?: number;

  @Expose()
  email?: string;

  @Expose()
  memo?: string;

  @Expose()
  @Transform(({ value }) => {
    if (!value) return value;
    return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }, { toPlainOnly: true })
  phone?: string;

  @Expose()
  @Transform(({ value }) => {
    if (!value) return value;
    return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }, { toPlainOnly: true })
  pPhone?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UpdateEnrollmentResponseDto)
  enrollments: UpdateEnrollmentResponseDto[];
}