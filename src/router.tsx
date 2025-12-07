import { createBrowserRouter } from "react-router-dom";
import { AuhtLayout, RootLayout } from "./layouts";
import { LoginForm } from "./features/auth/components/LoginForm";
import HomePage from "./features/home-dashboard/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuhtLayout />,
    children: [{ path: "", element: <LoginForm /> }],
  },
  {
    path: "/app",
    element: <RootLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
    ],
  },
]);
