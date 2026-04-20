import type { FormValues } from "../../components/student-components/StudentUpdateFormModal";

export type OptionalUpdateStudentType = Partial<FormValues>;

export type CombinedOptionalUpdateStudentType = {
  name: string;
  age: string;
  email: string;
  phone: string;
  pPhone: string;
  memo: string;
  courseIds: number[];
} & { id: number };

export const updateStudentApi = async (
  updateInfo: CombinedOptionalUpdateStudentType,
) => {
  const refineUpdateInfo = {
    name: updateInfo.name === '' ?  '이름 없음' : updateInfo.name,
    age: updateInfo.age  ===  '' ?  null : updateInfo.age,
    email: updateInfo.email === '' ? null : updateInfo.email,
    phone: updateInfo.phone === '' ? null : updateInfo.phone,
    pPhone: updateInfo.pPhone === '' ? null : updateInfo.pPhone,
    memo: updateInfo.memo === '' ? null : updateInfo.memo,
    courseIds: updateInfo.courseIds.length === 0 ? null : updateInfo.courseIds,
  };

  console.log(refineUpdateInfo);

  const response = await fetch(
    `http://localhost:3000/student/update/${updateInfo.id}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(refineUpdateInfo),
    },
  );

  if (!response.ok) {
    throw new Error("실패");
  }

  return await response.json();
};
