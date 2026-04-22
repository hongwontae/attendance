import { useQuery } from "@tanstack/react-query";
import { getCoursesApi } from "../../api/course/get-courses-api";
import { useAuthStore } from "../../store/auth-store";
import CourseCardLayout from "../../components/course-components/CourseCardLayout";

function CoursePage() {
  const user = useAuthStore((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryFn: getCoursesApi,
    queryKey: ["courses", user?.id],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (!data) {
    return null;
  }

  console.log(data);

  return (
    <>
      <CourseCardLayout data={data}></CourseCardLayout>
    </>
  );
}

export default CoursePage;
