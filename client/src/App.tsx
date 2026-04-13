import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "sonner";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthPage />,
    },
    {
      path: "/dashboard",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
