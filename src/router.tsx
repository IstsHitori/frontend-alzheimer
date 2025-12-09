import { createBrowserRouter } from "react-router-dom";
import { AuhtLayout, ProtectedLayout } from "./layouts";
import { LoginForm } from "./features/auth/components/LoginForm";
import HomePage from "./features/home-dashboard/pages/HomePage";
import AdministrationPage from "./features/administration/pages/AdministrationPage";
import MedicDashboardPage from "./features/medic-dashboard/pages/MedicDashboardPage";
import AnalysisPage from "./features/analysis/pages/AnalysisPage";

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
      {
        path: "medical-dashboard",
        element: <MedicDashboardPage />,
      },
      {
        path: "analysis",
        element: <AnalysisPage />,
      },
    ],
  },
]);
