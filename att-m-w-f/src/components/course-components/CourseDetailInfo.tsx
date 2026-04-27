import type { DetailCourseType } from "../../api/course/detail-get-course-api";
import InfoItem from "./InfoItem";

type Props = {
  course: DetailCourseType;
};

function CourseDetailInfo({ course }: Props) {
  const formatDate = (date: string | null) =>
    date ? new Date(date).toLocaleDateString() : "-";

  return (
    <div className="min-h-screen text-white px-16 py-12">

      {/* 제목 */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold">{course.name}</h1>
        <div className="mt-4 border-b border-gray-700" />
      </div>

      {/* 상단 2컬럼 */}
      <div className="grid grid-cols-2 gap-16 mb-16">

        {/* 기본 정보 */}
        <section>
          <h2 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">
            기본 정보
          </h2>

          <div className="space-y-3 text-sm">
            <InfoItem label="수업 이름" value={course.name}></InfoItem>
            <InfoItem label="시작일" value={formatDate(course.startDate)} />
            <InfoItem label="종료일" value={formatDate(course.endDate)} />
          </div>
        </section>

        {/* 강사 정보 */}
        <section>
          <h2 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">
            강사 정보
          </h2>

          <div className="space-y-3 text-sm">
            <InfoItem label="이름" value={course.instructor?.name ?? "미정"} />
            <InfoItem label="전화번호" value={course.instructor?.phone ?? "-"} />
            <InfoItem label="이메일" value={course.instructor?.email ?? "-"} />
          </div>
        </section>

      </div>

      {/* 수업 설명 */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">
          수업 설명
        </h2>

        <p className="text-gray-200 leading-relaxed text-sm max-w-3xl">
          {course.description || "설명이 없습니다."}
        </p>
      </section>

    </div>
  );
}

export default CourseDetailInfo;