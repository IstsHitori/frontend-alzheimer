import { create } from "zustand";
import type { Profile } from "../types/auth.types";

interface AuthStore {
  profile: Profile;
  isAuthenticated: boolean;
}

interface AuthActions {
  logout: () => void;
  setProfile: (profile: Profile) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthStore & AuthActions>((set) => ({
  profile: {} as Profile,
  isAuthenticated: !!localStorage.getItem("authToken"),
  logout: () => {
    localStorage.removeItem("authToken");
    set({
      profile: {} as Profile,
      isAuthenticated: false,
    });
  },
  setProfile: (profile) => set({ profile }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
