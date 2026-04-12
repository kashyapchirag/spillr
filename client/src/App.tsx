import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
