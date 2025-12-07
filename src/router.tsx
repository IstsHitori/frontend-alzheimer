import { createBrowserRouter } from "react-router-dom";
import { AuhtLayout, ProtectedLayout } from "./layouts";
import { LoginForm } from "./features/auth/components/LoginForm";
import HomePage from "./features/home-dashboard/pages/HomePage";
import AdministrationPage from "./features/administration/pages/AdministrationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuhtLayout />,
    children: [{ path: "", element: <LoginForm /> }],
  },
  {
    path: "/app",
    element: <ProtectedLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "admin",
        element: <AdministrationPage />,
      },
    ],
  },
]);
