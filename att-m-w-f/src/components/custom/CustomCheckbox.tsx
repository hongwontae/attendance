import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

const existCourses = ["JavaScript & React", "Java & Spring", "Excercise & Soccer"]

type Props<T extends FieldValues> = {
  name: Path<T>;
  checkFieldName: string;
  register: UseFormRegister<T>;
  courses : string[]
};

function CustomCheckbox<T extends FieldValues>({
  checkFieldName,
  register,
  name,
}: Props<T>) {
  return (
    <>
      <div className="flex flex-row gap-6 justify-center">
        <p>{checkFieldName}</p>
        {existCourses.map((course) => (
          <label key={course} className="flex items-center gap-2">
            <input type="checkbox" value={course} {...register(name)} />
            <span className="text-[0.8rem]">{course}</span>
          </label>
        ))}
      </div>
    </>
  );
}

export default CustomCheckbox;
