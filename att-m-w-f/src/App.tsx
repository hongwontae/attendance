import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/login/LoginPage";
import LayoutPage from "./pages/layout/LayoutPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TestPage from "./pages/test/TestPage";
import AppInitComponent from "./components/AppinitComponent";
import ProtectRouter from "./components/ProtectRouter";

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
