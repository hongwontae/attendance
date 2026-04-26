import type { StudentType } from "../../types/student-type/student-type";

export const DetailGetCourseStu = async (
  courseId: number,
): Promise<StudentType[]> => {
  const response = await fetch(
    `http://localhost:3000/course/detail/one/stu/${courseId}`,
    { method: "GET", credentials: "include" },
  );

  if (!response.ok) {
    throw new Error("에러 발생");
  }

  return await response.json();
};
