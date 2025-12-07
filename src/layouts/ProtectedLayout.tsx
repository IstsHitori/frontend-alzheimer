import { authApi } from "@/api";
import { useAuth } from "@/features/auth/hooks";
import { LoadingSpinner, NavigationMenu } from "@/shared/components";
import ErrorLoadProfile from "@/shared/components/ErrorLoadProrfile";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedLayout() {
  const { isAuthenticated, setProfile } = useAuth();

  const { isFetching, data, isSuccess, error } = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
    staleTime: 30 * 60 * 1000,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setProfile(data);
    }
  }, [isSuccess, data, setProfile]);

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
  if (error) return <ErrorLoadProfile />;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 to-accent/5 flex animate-fade-in">
      <NavigationMenu />

      <main className="flex-1 ml-16 lg:ml-64 p-3 sm:p-4 lg:p-6 animate-slide-up transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
