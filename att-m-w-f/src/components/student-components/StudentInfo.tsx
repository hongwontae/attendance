import type { CombinedType } from "../../api/student/get-student-api";
import type { PaginatedResponse } from "../../types/util-type/page-type";

type props = {
  stuInfo: PaginatedResponse<CombinedType>;
  onSelect : (student : CombinedType)=>void
};

function StudentInfo({ stuInfo, onSelect }: props) {


  return (
    <>
      <section className="grid grid-cols-2 gap-7 font-pretendard font-normal  justify-items-center">
        {stuInfo.data.map((ele) => {
          return (
            <div
              className="border rounded-2xl p-2 w-full grid grid-cols-2 grid-rows-2 grid-flow-col"
              key={ele.id}
              onClick={() => onSelect(ele)}
            >
              <div>이름 {ele.name}</div>
              <div>전화번호 : {ele.phone}</div>
              {ele.courses.map(({ name, id }, idx) => {
                if(idx === 2){
                    return
                }
                return (
                  <div key={id}>
                    과목-{id} : {name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
    </>
  );
}

export default StudentInfo;
