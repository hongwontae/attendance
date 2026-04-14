import type { SummaryStudentType } from "../../types/student-type/student-type";
import type { SummaryCourseType } from "../../types/course-type/course-type";
import type { PaginatedResponse } from "../../types/util-type/page-type";

export type CombinedType = SummaryStudentType & {
  courses: SummaryCourseType[];
};

export const getStudentAPi = async (
  page: number,
  keyword: string,
  signal : AbortSignal
): Promise<PaginatedResponse<CombinedType>> => {
  const response = await fetch(
    `http://localhost:3000/student/student/course/?page=${page}&limit=10&keyword=${keyword}`,
    {
      method: "GET",
      credentials: "include",
      signal
    },
  );

  if (!response.ok) {
    throw new Error("eerrr");
  }

  return await response.json();
};
