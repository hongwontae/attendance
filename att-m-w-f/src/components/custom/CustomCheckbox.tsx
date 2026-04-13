import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

export const existCourses = [
  { id: 1, name: "JavaScript & React" },
  { id: 2, name: "Java & Spring" },
  { id: 3, name: "Excercise & Soccer" },
];

type Props<T extends FieldValues> = {
  name: Path<T>;
  checkFieldName: string;
  register: UseFormRegister<T>;
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
          <label key={course.id} className="flex items-center gap-2">
            <input type="checkbox" value={String(course.id)} {...register(name)} />
            <span className="text-[0.8rem]">{course.name}</span>
          </label>
        ))}
      </div>
    </>
  );
}

export default CustomCheckbox;
