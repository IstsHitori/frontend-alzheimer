import { useAuth } from "@/features/auth/hooks";
import { Navigate, Outlet } from "react-router-dom";
export function AuhtLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={"/app/home"} replace={true} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
