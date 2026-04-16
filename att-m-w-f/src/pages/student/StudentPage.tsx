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
import { useSearchParams } from "react-router";
import StudentCreateFormModal from "../../components/student-components/StudentCreateFormModal";
import CustomIconButton from "../../components/custom/CustomIconButton";
import { useDebounce } from "../../custom-hooks/useDebounce";
import StudentSearch from "../../components/student-components/StudentSearch";
import StudentOrder from "../../components/student-components/StudentOrder";

function StudentPage() {
  const selectedStudent = studentStore((stu) => stu.selectedStudent);
  const mode = studentStore((stu) => stu.mode);
  const openCreate = studentStore((stu) => stu.openCreate);

  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ URL 값
  const page = Number(searchParams.get("page")) || 1;
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  const course = searchParams.get("course") || "";
  const sort = searchParams.get("sort") || "createdAt";
  const order = searchParams.get("order") || "ASC";

  // ✅ input state
  const [nameInput, setNameInput] = useState(name);
  const debouncedName = useDebounce(nameInput, 500);

  // URL → input 동기화
  useEffect(() => {
    setNameInput(name);
  }, [name]);

  // input → URL 동기화
  useEffect(() => {
    setSearchParams({
      page: "1",
      name: debouncedName,
      phone,
      course,
    });
  }, [debouncedName]);

  function changePageHandler(page: number) {
    setSearchParams({
      page: String(page),
      name,
      phone,
      course,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["students", { page, name, phone, course, sort, order }],
    queryFn: ({ signal }) =>
      getStudentAPi({ page, name, phone, course, sort, order }, signal),
    placeholderData: (prev) => prev,
  });

  if (isError) return <div>에러 발생</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div className="flex flex-col min-h-screen p-5 text-center">
      {/* 제목 + 버튼 */}
      <div className="relative mb-6">
        <h1 className="text-3xl font-semibold text-center">학생 목록</h1>
        <CustomIconButton
          onClick={openCreate}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded"
        />
      </div>

      {/* 🔥 Search 영역 + Filter 영역*/}
      <StudentSearch
        course={course}
        nameInput={nameInput}
        phone={phone}
        setNameInput={setNameInput}
        setSearchParams={setSearchParams}
      ></StudentSearch>

      {/* 리스트 */}
      <div className="grow">
        {isFetching && (
          <div className="absolute top-0 right-0 text-xs text-gray-400">
            업데이트 중...
          </div>
        )}
        <StudentInfo stuInfo={data} />
      </div>

      {/* Order */}
      <StudentOrder
        setSearchParams={setSearchParams}
        order={order}
        sort={sort}
      ></StudentOrder>

      {/* 페이지네이션 버튼*/}
      <section className="flex justify-center items-center font-bold">
        <StudentPageButton
          page={page}
          setPage={changePageHandler}
          lastPage={data.lastPage}
        />
      </section>

      {/* 모달 */}
      <AnimatePresence>
        {mode === "detail" && selectedStudent && (
          <StudentDetailModal stuInfo={selectedStudent} />
        )}
        {mode === "update" && selectedStudent && (
          <StudentUpdateFormModal stuInfo={selectedStudent} />
        )}
        {mode === "delete" && selectedStudent && (
          <StudentDeleteModal stuInfo={selectedStudent} />
        )}
        {mode === "create" && <StudentCreateFormModal />}
      </AnimatePresence>
    </div>
  );
}

export default StudentPage;
