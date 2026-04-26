import { Expose, Transform, Type } from 'class-transformer';
import { ResponseBasicInstructorDto } from 'src/instructor/dto/res-dto/response-basic-instructor-dto';

export class ResponseOneCourseDto {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => ResponseBasicInstructorDto)
  instructor: ResponseBasicInstructorDto | null;

  @Expose()
  description: string | null;

  @Transform(({ value }) =>
    value ? new Date(value).toISOString().slice(0, 10) : null,
  )
  startDate: string;

  @Transform(({ value }) =>
    value ? new Date(value).toISOString().slice(0, 10) : null,
  )
  endDate: string;
}
