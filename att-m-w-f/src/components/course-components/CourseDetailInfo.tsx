import type { DetailCourseType } from "../../api/course/detail-get-course-api";
import InfoItem from "./InfoItem";

type Props = {
  course: DetailCourseType;
};

function CourseDetailInfo({ course }: Props) {
  return (
    <>
   <div className="p-6 border rounded-2xl shadow bg-gray-700 text-white space-y-6">
  
  {/* 제목 */}
  <h1 className="text-2xl font-bold text-center">{course.name}</h1>

  {/* 기본 정보 */}
  <div className="divide-y divide-gray-600">
    <h2 className="text-sm text-gray-400">기본 정보</h2>

    <InfoItem label="시작일" value={course.startDate} />
    <InfoItem label="종료일" value={course.endDate} />
    <InfoItem label="강사" value={course.instructor?.name ?? '미정'} />
    <InfoItem label="수업 개설 날짜" value={new Date(course.createdAt).toLocaleDateString()} />
  </div>

  {/* 설명 */}
<div className="bg-gray-800 p-4 rounded-lg">
  <p className="text-gray-200">
    {course.description}
  </p>
</div>
</div>
    </>
  );
}

export default CourseDetailInfo;
