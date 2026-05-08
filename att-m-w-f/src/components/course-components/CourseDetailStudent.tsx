import { useQuery } from "@tanstack/react-query";
import type { MinimumStudentType } from "../../api/course/detail-get-course-stu-api";
import { detailStuApi } from "../../api/course/detail-stu-api";
import InfoItem from "./InfoItem";

type Props = {
  student: MinimumStudentType;
  courseId: number;
};

function CourseDetailStudent({ student, courseId }: Props) {
  const { data } = useQuery({
    queryKey: ["student-detail", student.id, courseId],
    queryFn: () => detailStuApi(student.id, courseId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });

  if (!data) {
    return <div>LLL</div>;
  }

  console.log(data)

  const detail = data.result;

  return (
    <>
<div className="space-y-10">

  {/* 헤더 */}
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold">{detail.name}</h1>

    <button className="text-blue-400">
      수정
    </button>
  </div>

  <div className="border-b border-gray-700" />

  {/* 2단 레이아웃 */}
  <div className="grid grid-cols-2 gap-20">

    {/* 기본 정보 */}
    <section className="space-y-6">
      <h2 className="text-gray-400 font-semibold">
        기본 정보
      </h2>

      <InfoItem label="이름" value={detail.name} />
      <InfoItem label="나이" value={detail.age} />
      <InfoItem label="이메일" value={detail.email} />
      <InfoItem label="전화번호" value={detail.phone} />
    </section>

    {/* 출석 정보 */}
    <section className="space-y-6">
      <h2 className="text-gray-400 font-semibold">
        출석 정보
      </h2>

      <InfoItem
        label="출석률"
        value={`${data.attendanceRate}%`}
      />

      <InfoItem
        label="출석"
        value={`${detail.presentCount} / ${detail.totalCount}`}
      />
    </section>
  </div>

  {/* 메모 */}
<section className="space-y-4">
  <h2 className="text-gray-400 font-semibold text-lg">
    메모
  </h2>

  <div
    className="
      rounded-2xl
      bg-[#95A78D]
      p-6
      min-h-[120px]
      leading-relaxed
      shadow-sm
    "
  >
    {detail.memo ?? "메모 없음"}
  </div>
</section>

</div>
    </>
  );
}

export default CourseDetailStudent;
