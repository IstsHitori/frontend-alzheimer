import type { Patient } from "@/features/patient/types/patient.types";
import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { api } from "./base-http";
import { arrayPatientSchema } from "@/features/patient/schemas/patient.schemas";

class PatientApi {
  async getAllPatients(): Promise<Patient[]> {
    try {
      return await fetchAndValidateSchema<Patient[]>(
        () => api.get("/patient"),
        arrayPatientSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const patientApi = new PatientApi();
