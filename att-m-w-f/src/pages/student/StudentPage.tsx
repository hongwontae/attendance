import { useQuery } from "@tanstack/react-query";
import { getStudentAPi } from "../../api/student/get-student-api";
import StudentInfo from "../../components/student-components/StudentInfo";
import { useState } from "react";
import StudentPageButton from "../../components/student-components/StudentPageButton";

function StudentPage() {
  const [page, setPage] = useState<number>(1);

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

        {/* 핵심 */}
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
      </div>
    </>
  );
}

export default StudentPage;
