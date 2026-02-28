import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/login/LoginPage";
import LayoutPage from "./pages/layout/LayoutPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutPage></LayoutPage>,
      children: [{ index: true, element: <LoginPage></LoginPage>}],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
