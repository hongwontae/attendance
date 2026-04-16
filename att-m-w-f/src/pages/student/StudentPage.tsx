import { useQuery } from "@tanstack/react-query";
import { getStudentAPi } from "../../api/student/get-student-api";
import StudentInfo from "../../components/student-components/StudentInfo";
import { useEffect, useState } from "react";
import StudentPageButton from "../../components/student-components/StudentPageButton";
import { AnimatePresence } from "framer-motion";
import StudentDetailModal from "../../components/student-components/StudentDetailModal";
import StudentUpdateFormModal from "../../components/student-components/StudentUpdateFormModal";
import StudentDeleteModal from "../../components/student-components/StudentDeleteModal";
import { studentStore } from "../../store/stu-store";
import StudentSearch from "../../components/student-components/StudentSearch";
import { useDebounce } from "../../custom-hooks/useDebounce";
import { useSearchParams } from "react-router";
import StudentCreateFormModal from "../../components/student-components/StudentCreateFormModal";
import CustomIconButton from "../../components/custom/CustomIconButton";

function StudentPage() {
  // 3개의 상태

  const selectedStudent = studentStore((stu) => stu.selectedStudent);
  const mode = studentStore((stu) => stu.mode);

  // Test
  const openCreate = studentStore((stu) => stu.openCreate);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const urlKeyword = searchParams.get("keyword") || "";

  const [inputValue, setInputValue] = useState(urlKeyword);
  const keyword = useDebounce(inputValue, 500);

  // ✅ URL → input 동기화 (뒤로가기 대응)
  useEffect(() => {
    setInputValue(urlKeyword);
  }, [urlKeyword]);

  // ✅ input → URL 동기화
  useEffect(() => {
    const currentKeyword = searchParams.get("keyword") || "";

    if (currentKeyword !== keyword) {
      setSearchParams({
        page: "1",
        keyword,
      });
    }
  }, [keyword]);

  // chnage Handler
  function changePageHandler(page: number) {
    setSearchParams({
      page: String(page),
      keyword,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["students", page, keyword],
    queryFn: ({ signal }) => getStudentAPi(page, keyword, signal),
    placeholderData: (prev) => prev,
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
        <div className="relative mb-6">
          {/* 제목 (가운데 유지) */}
          <h1 className="text-3xl font-semibold text-center">학생 목록</h1>

          {/* 오른쪽 끝 버튼 */}
          <CustomIconButton
            onClick={openCreate}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-red-500 text-white px-4 py-2 rounded"
          />
        </div>

        {/* Search */}
        <StudentSearch value={inputValue} onChange={(v) => setInputValue(v)} />

        {/* Create 버튼 */}

        <div className="grow">
          {isFetching && (
            <div className="absolute top-0 right-0 text-xs text-gray-400">
              업데이트 중...
            </div>
          )}
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
          {mode === "create" ? <StudentCreateFormModal /> : null}
        </AnimatePresence>
      </div>
    </>
  );
}

export default StudentPage;
