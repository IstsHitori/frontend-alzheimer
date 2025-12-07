import { create } from "zustand";
import type { Profile } from "../types/auth.types";

interface AuthStore {
  profile: Profile;
  isAuthenticated: boolean;
}

interface AuthActions {
  logout: () => void;
}

export const useAuthStore = create<AuthStore & AuthActions>((set, get) => ({
  profile: {} as Profile,
  isAuthenticated: !!localStorage.getItem("authToken"),
  logout: () => {
    localStorage.removeItem("authStore");
    set({
      profile: {} as Profile,
      isAuthenticated: false,
    });
  },
}));
