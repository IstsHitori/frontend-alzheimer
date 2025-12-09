import { useAuthStore } from "../store/auth.store";

export function useAuth() {
  const logout = useAuthStore((state) => state.logout);
  const setProfile = useAuthStore((state) => state.setProfile);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const profile = useAuthStore((state) => state.profile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return { setProfile, setAuthenticated, logout, profile, isAuthenticated };
}
