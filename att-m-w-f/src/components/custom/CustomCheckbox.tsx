import { useQuery } from "@tanstack/react-query";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { getCoursesApi } from "../../api/course/get-courses-api";

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

  const {data, isLoading, isError} = useQuery({
    queryKey : ['checkbox-course'],
    queryFn : getCoursesApi,
    staleTime : 10000 * 60 * 5,
  })

  if(isLoading){
    return <div>loading..</div>
  }
  if(isError){
    return <div>Error!</div>
  }
  if(!data){
    return null;
  }
  

  return (
    <>
      <div className="flex flex-row gap-6 justify-center items-center">
        <p>{checkFieldName}</p>

        <section className="grid grid-cols-3">
          {data.map((course) => (
            <label key={course.id} className="flex items-center gap-2 justify-center">
              <input
                type="checkbox"
                value={String(course.id)}
                {...register(name)}
              />
              <span className="text-[0.8rem]">{course.name}</span>
            </label>
          ))}
        </section>
      </div>
    </>
  );
}

export default CustomCheckbox;
