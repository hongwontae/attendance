import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { getDetailCourseApi } from "../../api/course/detail-get-course-api";
import { DetailGetCourseStu } from "../../api/course/detail-get-course-stu-api";
import CourseDetailInfo from "../../components/course-components/CourseDetailInfo";
import CourseStudents from "../../components/course-components/CourseStudents";
import { AnimatePresence, motion } from "framer-motion";

function CourseDetailPage() {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "info";
  const handleTabChange = (value: "info" | "students") => {
    setSearchParams({ tab: value });
  };

  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
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
        <AnimatePresence mode="wait">
          {tab === "info" && (
            <motion.div
              key="info"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <CourseDetailInfo
                buttonChangeEvent={handleTabChange}
                course={detailCourse.data}
              ></CourseDetailInfo>
            </motion.div>
          )}
          {tab === "students" && (
            <motion.div
              key="students"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }} 
            >
              <CourseStudents
                buttonChangeEvent={handleTabChange}
                students={detailStudent.data}
              ></CourseStudents>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

export default CourseDetailPage;
