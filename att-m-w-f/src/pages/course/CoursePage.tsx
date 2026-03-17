import { useQuery } from "@tanstack/react-query";
import { getCourseApi } from "../../api/course/get-course-api";
import { useNavigate } from "react-router";

function CoursePage() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourseApi,
  });

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isError) {
    return <div>Error..</div>;
  }

  console.log(data);

  return (
    <>
      <section className="flex flex-col justify-center items-center p-3">
        <h1>Course List</h1>
        <div className="flex flex-row gap-2 justify-center items-center mt-10">
          {data?.map(({ id, name }) => {
            return (
              <div key={id} onClick={() => navigate(`/courses/${id}`)} className="border p-2 rounded-2xl">
                <h3>{name}</h3>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default CoursePage;
