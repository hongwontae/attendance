export type StudentType = {
  id: number;
  name: string;
  age: number;
  phone: string;
  pPhone: string;
  email: string;
  memo: string;
  createdAt: string;
  updatedAt: string;
};

export type EnrollmentType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  student: StudentType;
};

export type GetCourseDetailType = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  enrollments: EnrollmentType[];
};