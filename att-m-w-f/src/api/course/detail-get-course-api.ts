type InstructorType = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  createdAt : string;
  updatedAt : string;
};

type DetailCourseType = {
  id: number;
  name: string;
  instructor: InstructorType | null;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  createdAt : string;
  updatedAt : string;
};

export const getDetailCourseApi = async (
  courseId: number,
): Promise<DetailCourseType> => {
  const response = await fetch(
    `http://localhost:3000/course/detail/one/${courseId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("데이터 페칭 실패");
  }

  return await response.json();
};
