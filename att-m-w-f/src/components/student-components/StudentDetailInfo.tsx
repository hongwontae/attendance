import type { CombinedType } from "../../api/student/get-student-api";

type Props = {
  stuInfo: CombinedType;
};

function StudentDetailInfo({ stuInfo }: Props) {
  return (
    <>
      <div className="font-pretendard font-medium">
        <div className="mb-2 font-bold">상세 정보</div>
        <article className="flex flex-col gap-2 ">
          <div>이름 : {stuInfo.name}</div>
          <div>나이 : {stuInfo.age}</div>
          <div className="flex flex-col gap-2 justify-center">
            {stuInfo.courses.map((ele)=>{
              return <div key={ele.id}>
                <div>과목-{ele.id} : {ele.name}</div>
              </div>
            })}
          </div>
          <div>이메일 : {stuInfo.email}</div>
          <div>학생 전화번호 : {stuInfo.phone}</div>
          <div>부모님 전화번호 : {stuInfo.pPhone}</div>
          <div>메모 : {stuInfo.memo}</div>
        </article>
      </div>
    </>
  );
}

export default StudentDetailInfo;
