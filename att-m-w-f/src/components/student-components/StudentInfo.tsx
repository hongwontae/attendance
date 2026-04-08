import { useState } from "react";
import type { CombinedType } from "../../api/student/get-student-api";
import StudentDetailModal from "./StudentDetailModal";
import { AnimatePresence } from "framer-motion";
import type { PaginatedResponse } from "../../types/util-type/page-type";

type props = {
  stuInfo : PaginatedResponse<CombinedType>;
};

function StudentInfo({ stuInfo }: props) {
  const [selectedStudent, setSelectedStudent] = useState<CombinedType | null>(
    null,
  );

  function closeModal() {
    setSelectedStudent(null);
  }

  return (
    <>
      <section className="grid grid-cols-2 gap-7 font-pretendard font-normal  justify-items-center">
        {stuInfo.data.map((ele) => {
          return (
            <div
              className="border rounded-2xl p-2 w-full"
              key={ele.id}
              onClick={() => setSelectedStudent(ele)}
            >
              <div className="flex flex-row gap-2 justify-center">
                <div>이름 {ele.name}</div>
                <div>나이 : {ele.age}</div>
              </div>
              <div>전화번호 : {ele.phone}</div>
            </div>
          );
        })}
      </section>
      <AnimatePresence>
        {selectedStudent && (
          <StudentDetailModal
            closeModal={closeModal}
            stuInfo={selectedStudent}
          ></StudentDetailModal>
        )}
      </AnimatePresence>
    </>
  );
}

export default StudentInfo;
