import { create } from "zustand";
import type { Condition, Eps, Medication } from "../types";

interface CatalogState {
  epsList: Eps[];
  conditions: Condition[];
  medications: Medication[];
}
interface CatalogActions {
  setEpsList: (epsList: Eps[]) => void;
  setConditions: (conditions: Condition[]) => void;
  setMedications: (medications: Medication[]) => void;
}

export const useCatalogStore = create<CatalogState & CatalogActions>((set) => ({
  epsList: [],
  conditions: [],
  medications: [],
  setEpsList: (epsList) => set({ epsList }),
  setConditions: (conditions) => set({ conditions }),
  setMedications: (medications) => set({ medications }),
}));
