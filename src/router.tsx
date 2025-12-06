import { createBrowserRouter } from "react-router-dom";
import { AuhtLayout, RootLayout } from "./layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuhtLayout />,
    children: [],
  },
  {
    path: "/app",
    element: <RootLayout />,
    children: [],
  },
]);
