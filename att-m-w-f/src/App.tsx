import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/login/LoginPage";
import LayoutPage from "./pages/layout/LayoutPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TestPage from "./pages/test/TestPage";
import AppInitComponent from "./components/utils/AppinitComponent";
import ProtectRouter from "./components/utils/ProtectRouter";
import CoursePage from "./pages/course/CoursePage";
import CourseDetail from "./components/course-components/CourseDetail";
import CourseStudentAttendance from "./components/course-components/CourseStudentAttendance";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutPage></LayoutPage>,
      children: [
        { index: true, element: <LoginPage></LoginPage> },
        {
          path: "/test",
          element: (
            <ProtectRouter>
              <TestPage />
            </ProtectRouter>
          ),
        },
        {
          path: "/course",
          element: (
            <ProtectRouter>
              <CoursePage></CoursePage>
            </ProtectRouter>
          ),
        },
        {
          path : '/courses/:courseId',
          element : (
            <ProtectRouter>
              <CourseDetail></CourseDetail>
            </ProtectRouter>
          )
        },
        {
          path : '/course/:courseId/student/:studentId',
          element : (
            <ProtectRouter>
              <CourseStudentAttendance></CourseStudentAttendance>
            </ProtectRouter>
          )
        }
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppInitComponent></AppInitComponent>

        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
