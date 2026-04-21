import type { EnrollmentType } from "../../types/enrollment-type/enrollment-type";
import type { StudentType } from "../../types/student-type/student-type";

export type EnrollAndStudentType = {
  student : StudentType
} & EnrollmentType;

export type GetCoursesType = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  enrollments : EnrollAndStudentType[];
};


export const getCoursesApi = async (): Promise<GetCoursesType[]> => {
  const response = await fetch("http://localhost:3000/course/all", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Get course API Error");
  }

  return await response.json();
};
