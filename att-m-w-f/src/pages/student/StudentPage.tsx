import { useQuery } from "@tanstack/react-query";
import {
  getStudentAPi,
  type CombinedType,
} from "../../api/student/get-student-api";
import StudentInfo from "../../components/student-components/StudentInfo";
import { useState } from "react";
import StudentPageButton from "../../components/student-components/StudentPageButton";
import { AnimatePresence } from "framer-motion";
import StudentDetailModal from "../../components/student-components/StudentDetailModal";
import StudentUpdateFormModal from "../../components/student-components/StudentUpdateFormModal";

function StudentPage() {
  const [page, setPage] = useState<number>(1);
  const [selectedStudent, setSelectedStudent] = useState<CombinedType | null>(
    null,
  );
  const [mode, setMode] = useState<"detail" | "update" | null>(null);

  function openDetail(student: CombinedType) {
    setSelectedStudent(student);
    setMode("detail");
  }

  function openUpdate() {
    setMode("update");
  }

  function closeModal() {
    setSelectedStudent(null);
    setMode(null);
  }

  function changePageHandler(page: number) {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["students", page],
    queryFn: () => getStudentAPi(page),
  });

  if (isError) {
    return <div>Error!</div>;
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

        <div className="grow">
          <StudentInfo stuInfo={data} onSelect={openDetail} />
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
            <StudentDetailModal
              stuInfo={selectedStudent}
              closeModal={closeModal}
              updateModal={openUpdate}
            ></StudentDetailModal>
          )}
          {mode === "update" && selectedStudent && (
            <StudentUpdateFormModal
              stuInfo={selectedStudent}
              closeModal={closeModal}
            ></StudentUpdateFormModal>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default StudentPage;
