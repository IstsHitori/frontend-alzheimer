import { create } from "zustand";
import type { HomeDashboardStats } from "../types/home.types";

interface HomeStatsState {
  homeStats: HomeDashboardStats;
}

interface HomeStatsActions {
  setHomeStats: (homeStats: HomeDashboardStats) => void;
}

export const useHomeStatsStore = create<HomeStatsState & HomeStatsActions>(
  (set) => ({
    homeStats: {} as HomeDashboardStats,
    setHomeStats: (homeStats) => set({ homeStats }),
  })
);
