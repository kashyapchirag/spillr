import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "sonner";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthPage />,
      children: [
        {
          path: "/dashboard",
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
