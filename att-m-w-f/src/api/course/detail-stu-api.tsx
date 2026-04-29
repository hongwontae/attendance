import type { StudentType } from "../../types/student-type/student-type";

export const detailStuApi = async (
  studentId: number,
  courseId: number,
): Promise<StudentType> => {
  const response = await fetch(
    `http://localhost:3000/course/detail/belong/stu/${studentId}/${courseId}`,
    {
      method: "get",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("에러 발생");
  }

  return await response.json();
};
