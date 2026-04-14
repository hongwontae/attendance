import { useQuery } from "@tanstack/react-query";
import { getStudentAPi } from "../../api/student/get-student-api";
import StudentInfo from "../../components/student-components/StudentInfo";
import { useState } from "react";
import StudentPageButton from "../../components/student-components/StudentPageButton";
import { AnimatePresence } from "framer-motion";
import StudentDetailModal from "../../components/student-components/StudentDetailModal";
import StudentUpdateFormModal from "../../components/student-components/StudentUpdateFormModal";
import StudentDeleteModal from "../../components/student-components/StudentDeleteModal";
import { studentStore } from "../../store/stu-store";
import StudentSearch from "../../components/student-components/StudentSearch";

function StudentPage() {
  // 3개의 상태
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const selectedStudent = studentStore((stu) => stu.selectedStudent);
  const mode = studentStore((stu) => stu.mode);

  // chnage Handler
  function changePageHandler(page: number) {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["students", page, keyword],
    queryFn: () => getStudentAPi(page, keyword)
  });

  if (isError) {
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen p-5 text-center">
        <h1 className="text-3xl mb-10 font-pretendard font-semibold">
          학생 목록
        </h1>

        <div>
          <StudentSearch onSearch={(kw)=>{
            setPage(1);
            setKeyword(kw);
          }}></StudentSearch>
        </div>

        <div className="grow">
          <StudentInfo stuInfo={data} />
        </div>

        <section className="flex justify-center items-center font-bold">
          <StudentPageButton
            page={page}
            setPage={changePageHandler}
            lastPage={data.lastPage}
          />
        </section>

        <AnimatePresence>
          {mode === "detail" && selectedStudent && (
            <StudentDetailModal stuInfo={selectedStudent}></StudentDetailModal>
          )}
          {mode === "update" && selectedStudent && (
            <StudentUpdateFormModal
              stuInfo={selectedStudent}
            ></StudentUpdateFormModal>
          )}
          {mode === "delete" && selectedStudent && (
            <StudentDeleteModal stuInfo={selectedStudent!}></StudentDeleteModal>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default StudentPage;
