import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/login/LoginPage";
import LayoutPage from "./pages/layout/LayoutPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TestPage from "./pages/test/TestPage";
import AppInitComponent from "./components/utils/AppinitComponent";
import ProtectRouter from "./components/utils/ProtectRouter";
import StudentPage from "./pages/student/StudentPage";
import Test2Page from "./pages/test/Test2Page";
import CoursePage from "./pages/course/CoursePage";
import CourseDetailPage from "./pages/course/CourseDetailPage";

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
          path: "/test2",
          element: (
            <ProtectRouter>
              <Test2Page></Test2Page>
            </ProtectRouter>
          ),
        },
        {
          path: "/student",
          element: (
            <ProtectRouter>
              <StudentPage></StudentPage>
            </ProtectRouter>
          ),
        },
        {
          path: "/courses",
          element: (
            <ProtectRouter>
              <CoursePage></CoursePage>
            </ProtectRouter>
          ),
        },
        {
          path: "/course/detail/:id",
          element: (
            <ProtectRouter>
              <CourseDetailPage></CourseDetailPage>
            </ProtectRouter>
          ),
        },
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
