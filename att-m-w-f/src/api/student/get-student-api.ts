import type { SummaryStudentType } from "../../types/student-type/student-type";
import type { SummaryCourseType } from "../../types/course-type/course-type";

export type CombinedType = SummaryStudentType & {
  courses: SummaryCourseType[];
};

export const getStudentAPi = async (
  params: {
    page: number;
    name?: string;
    phone?: string;
    course?: string;
    sort ? : string;
    order? : string
  },
  signal?: AbortSignal
) => {
  const query = new URLSearchParams();

  query.append("page", String(params.page));
  if (params.name) query.append("name", params.name);
  if (params.phone) query.append("phone", params.phone);
  if (params.course) query.append("course", params.course);
  if(params.sort) query.append('sort', params.sort);
  if(params.order) query.append('order', params.order)

  const res = await fetch(`http://localhost:3000/student/search?${query.toString()}`, {
    credentials: "include",
    method : 'GET',
    signal,
  });

  return res.json();
};