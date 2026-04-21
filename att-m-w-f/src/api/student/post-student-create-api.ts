type PostCreateStudentType = {
  name: string;
  age: string;
  email?: string;
  phone: string;
  pPhone?: string;
  memo?: string;
  courses: number[];
};

export const postCreateStudentApi = async (info: PostCreateStudentType) => {
  const refineUpdateInfo = {
    name: info.name === "" ? "이름 없음" : info.name,
    age: info.age === "" ? null : info.age,
    email: info.email === "" ? null : info.email,
    phone: info.phone === "" ? null : info.phone,
    pPhone: info.pPhone === "" ? null : info.pPhone,
    memo: info.memo === "" ? null : info.memo,
    courses: info.courses.length === 0 ? null : info.courses,
  };

  console.log(refineUpdateInfo);

  const response = await fetch(
    "http://localhost:3000/student/combined/create",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refineUpdateInfo),
    },
  );

  if (!response.ok) {
    throw new Error("hello-world");
  }

  return await response.json();
};
