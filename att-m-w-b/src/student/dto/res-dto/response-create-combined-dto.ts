import { Transform, Exclude, Expose } from 'class-transformer';

export class StudentResponseDto {
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
  })
  phone?: string;

  @Expose()
  @Transform(({ value }) => {
    if (!value) return value;
    return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  })
  pPhone?: string;
}