import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getDetailCourseApi } from "../../api/course/detail-get-course-api";
import { DetailGetCourseStu } from "../../api/course/detail-get-course-stu-api";
import CourseDetailInfo from "../../components/course-components/CourseDetailInfo";

function CourseDetailPage() {
  const { id } = useParams();

  const detailCourse = useQuery({
    queryKey: ["detail-course", id],
    queryFn: () => getDetailCourseApi(Number(id)),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
  const detailStudent = useQuery({
    queryKey: ["detail-course-student", id],
    queryFn: () => DetailGetCourseStu(Number(id)),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });

  if (!detailCourse.data) {
    return <div>수업 정보가 없습니다.</div>;
  }

  return (
    <>
      <section className="font-pretendard font-bold">
        <CourseDetailInfo course={detailCourse.data}></CourseDetailInfo>
      </section>
    </>
  );
}

export default CourseDetailPage;
