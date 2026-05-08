import { useSearchParams } from "react-router";

import CourseDetailStudent from "./CourseDetailStudent";
import type { MinimumStudentType } from "../../api/course/detail-get-course-stu-api";

type Props = {
  students: MinimumStudentType[];
  buttonChangeEvent: (value: "info" | "students") => void;
  courseId: number;
};

function CourseStudents({ students, buttonChangeEvent, courseId }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedId = searchParams.get("studentId");

  const selectedStudent = students.find((s) => String(s.id) === selectedId);

  return (
    <>
      <section className="p-2">
        <button
          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2 mb-1"
          onClick={() => buttonChangeEvent("info")}
        >
         → Back Course 
        </button>

        <div className="grid grid-cols-[300px_1fr] gap-8 p-1">
          {/* 학생 리스트 */}
          <div className="h-[calc(100vh-120px)] overflow-y-auto pr-2">
            {students.map((s) => {
              const isSelected = selectedId === String(s.id);

              return (
                <div
                  key={s.id}
                  onClick={() => {
                    setSearchParams((prev) => {
                      prev.set("studentId", String(s.id));
                      return prev;
                    });
                  }}
                  className={`
            p-3
            cursor-pointer
            rounded-xl
            transition
            mb-2

            ${isSelected ? "bg-blue-600 text-white" : "hover:bg-gray-800"}
          `}
                >
                  {s.name}
                </div>
              );
            })}
          </div>

          {/* 학생 상세 */}
          <div>
            {selectedStudent ? (
              <CourseDetailStudent
                student={selectedStudent}
                courseId={courseId}
              />
            ) : (
              <div className="text-gray-500">학생을 선택해주세요 👈</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseStudents;
