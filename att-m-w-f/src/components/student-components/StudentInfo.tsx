import type { CombinedType } from "../../api/student/get-student-api";

type props = {
  stuInfo: CombinedType[];
};

function StudentInfo({ stuInfo }: props) {
  return (
    <>
      <section className="flex flex-col gap-4 font-pretendard font-normal items-center">
        {stuInfo.map(({ name, age, phone }) => {
          return (
            <div className="border rounded-2xl p-2 w-1/2">
              <div className="flex flex-row gap-2 justify-center">
                <div>이름 {name}</div>
                <div>나이 : {age}</div>
              </div>
              <div>전화번호 : {phone}</div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default StudentInfo;
