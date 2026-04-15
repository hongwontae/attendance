import type { FormValues } from "../../components/student-components/StudentUpdateFormModal";

export type OptionalUpdateStudentType = Partial<FormValues>;

export type CombinedOptionalUpdateStudentType = {
  name: string;
  age: number;
  email: string;
  phone: string;
  pPhone: string;
  memo: string;
  courseIds: number[];
} & { id: number };

export const updateStudentApi = async (
  updateInfo: CombinedOptionalUpdateStudentType,
) => {
  console.log(updateInfo);

  const response = await fetch(
    `http://localhost:3000/student/update/${updateInfo.id}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(updateInfo),
    },
  );

  if (!response.ok) {
    throw new Error("실패");
  }

  return await response.json();
};
