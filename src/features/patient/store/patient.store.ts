import { create } from "zustand";
import type { Patient } from "../types/patient.types";

interface PatientState {
  patients: Patient[];
}

interface PatientActions {
  setPatients: (patients: Patient[]) => void;
}

export const usePatientStore = create<PatientState & PatientActions>((set) => ({
  patients: [],
  setPatients: (patients) => set({ patients }),
}));
