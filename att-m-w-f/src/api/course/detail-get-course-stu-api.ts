

export type MinimumStudentType = {
  id : number;
  name : string;
}

export const DetailGetCourseStu = async (
  courseId: number,
): Promise<MinimumStudentType[]> => {
  const response = await fetch(
    `http://localhost:3000/course/detail/one/stu/${courseId}`,
    { method: "GET", credentials: "include" },
  );

  if (!response.ok) {
    throw new Error("에러 발생");
  }

  return await response.json();
};
