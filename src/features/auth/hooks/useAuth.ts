import { useAuthStore } from "../store/auth.store";

export function useAuth() {
  const logout = useAuthStore((state) => state.logout);
  const profile = useAuthStore((state) => state.profile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return { logout, profile, isAuthenticated };
}
