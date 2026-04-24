
export type GetCoursesType = {
  id: number;
  name: string;
  instructor : string;
  description: string;
  startDate: string;
  endDate: string;
  enrollmentsLength : number;
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
