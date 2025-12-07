import { create } from "zustand";
import type { Activity } from "../types/home.types";

interface ActivityState {
  activities: Activity[];
}

interface ActivityActions {
  setActivities: (activities: Activity[]) => void;
}

export const useActivityStore = create<ActivityState & ActivityActions>(
  (set) => ({
    activities: [],
    setActivities: (activities) => set({ activities }),
  })
);
