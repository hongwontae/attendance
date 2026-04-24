import { Expose, Transform, Type } from 'class-transformer';

export class ResponseShowCourseDto {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  name: string;

  @Expose()
  instructor: string;

  @Expose()
  description: string;

  @Expose()
  enrollmentsLength: number;

  @Transform(({ value }) =>
    value ? new Date(value).toISOString().slice(0, 10) : null,
  )
  startDate: string;

  @Transform(({ value }) =>
    value ? new Date(value).toISOString().slice(0, 10) : null,
  )
  endDate: string;
}
