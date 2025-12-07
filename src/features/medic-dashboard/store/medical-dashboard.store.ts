import { create } from "zustand";
import type { MedicDashboard } from "../types";

interface MedicalDashboardState {
  medicalStats: MedicDashboard | null;
}

interface MedicalDashboardActions {
  setMedicalStats: (medicalStats: MedicDashboard) => void;
}

export const useMedicalDashboardStore = create<
  MedicalDashboardState & MedicalDashboardActions
>((set) => ({
  medicalStats: null,
  setMedicalStats: (medicalStats) => set({ medicalStats }),
}));
