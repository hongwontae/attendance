import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getCourseDetailApi } from "../../api/course/get-course-detail-api";

function CourseDetail() {
  const { courseId } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryFn: () => {
      return getCourseDetailApi(Number(courseId));
    },
    queryKey: ["course", courseId],
    enabled: !!courseId,
  });

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>...Loading..</div>;
  }

  console.log(data);

  return (
    <>
      <article className="m-10">
        <h1 className="mb-8 border rounded-3xl w-fit p-2">{data?.name}</h1>
        <section className="flex flex-row flex-wrap gap-5">
          {data?.enrollments.map(({ student }) => {
            return (
              <Link className="border p-2 w-1/2" to={`/course/${courseId}/student/${student.id}`}>
                <div>{student.name} - {student.age} - {student.phone}</div>
              </Link>
            );
          })}
        </section>
      </article>
    </>
  );
}

export default CourseDetail;
