import type { PatientAnalysis } from "@/features/analysis/types";
import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { api } from "./base-http";
import type { Patient } from "@/features/patient/types/patient.types";
import { arrayPatientAnalysis } from "@/features/analysis/schemas";

export class AnalysisApi {
  async getAnalysisByPatientId(
    patientId: Patient["id"]
  ): Promise<PatientAnalysis[]> {
    try {
      return await fetchAndValidateSchema<PatientAnalysis[]>(
        () => api.get(`/analysis/patient/${patientId}`),
        arrayPatientAnalysis
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const analysisApi = new AnalysisApi();
