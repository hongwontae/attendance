import { Transform } from 'class-transformer';

export function EmptyToNull() {
  return Transform(({ value }) => {
    if (value === '') return null;
    return value;
  });
}