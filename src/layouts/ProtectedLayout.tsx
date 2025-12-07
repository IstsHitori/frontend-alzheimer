import { authApi } from "@/api";
import { useAuth } from "@/features/auth/hooks";
import { LoadingSpinner } from "@/shared/components";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export function ProtectedLayout() {
  const { isAuthenticated, setProfile } = useAuth();

  const { isFetching, data, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
  });

  if (isFetching)
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <LoadingSpinner
          title="Cargando perfil"
          description="Por favor espera a que cargue tu perfil..."
        />
      </div>
    );
  if (!isAuthenticated) return <Navigate to={"/"} replace={true} />;
  if (isSuccess) setProfile(data);

  return <div>RootLayout</div>;
}
