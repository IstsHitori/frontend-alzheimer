import { useAuth } from "@/features/auth/hooks";
import { Navigate } from "react-router-dom";

export function RootLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={"/"} replace={true} />;
  return <div>RootLayout</div>;
}
