import { useState } from "react";
import type { StudentType } from "../../types/student-type/student-type";
import CourseDetailStudent from "./CourseDetailStudent";

type Props = {
  students: StudentType[];
  buttonChangeEvent: (value: "info" | "students") => void;
};

function CourseStudents({ students, buttonChangeEvent }: Props) {
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
    null,
  );

  return (
    <>
      <div>Hello - Students</div>
      <button onClick={() => buttonChangeEvent("info")}>Info</button>

      <div className="grid grid-cols-[300px_1fr] gap-8">
        <div>
          {students &&
            students.map((s) => {
              return (
                <div
                  className="p-3 cursor-pointer hover:bg-gray-700"
                  key={s.id}
                  onClick={() => setSelectedStudent(s)}
                >
                  {s.name}
                </div>
              );
            })}
        </div>
        <div>
          {selectedStudent ? (
            <CourseDetailStudent
              student={selectedStudent}
            ></CourseDetailStudent>
          ) : (
            <div className="text-gray-700">학생을 선택해주세요</div>
          )}
        </div>
      </div>
    </>
  );
}

export default CourseStudents;
