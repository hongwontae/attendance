import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { getDetailCourseApi } from "../../api/course/detail-get-course-api";
import { DetailGetCourseStu } from "../../api/course/detail-get-course-stu-api";
import CourseDetailInfo from "../../components/course-components/CourseDetailInfo";
import CourseStudents from "../../components/course-components/CourseStudents";

function CourseDetailPage() {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? "info";
  const handleTabChange = (value: "info" | "students") => {
  setSearchParams({ tab: value });
};



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

  if (!detailStudent.data) {
    return <div>학생 정보가 없습니다.</div>;
  }

  return (
    <>
      <section className="font-pretendard font-bold">
        {tab === "info" && (
          <CourseDetailInfo
            buttonChangeEvent={handleTabChange}
            course={detailCourse.data}
          ></CourseDetailInfo>
        )}
        {tab === "students" && (
          <CourseStudents
            buttonChangeEvent={handleTabChange}
            students={detailStudent.data}
          ></CourseStudents>
        )}
      </section>
    </>
  );
}

export default CourseDetailPage;
