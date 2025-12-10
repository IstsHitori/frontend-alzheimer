import type {
  AnalyzePyload,
  CreateAnalysisRespnse,
  PatientAnalysis,
} from "@/features/analysis/types";
import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { api, apiPython } from "./base-http";
import type { Patient } from "@/features/patient/types/patient.types";
import {
  createAnalysisResponse,
  arrayPatientAnalysis,
  deleteAnalysisPatientResponse,
} from "@/features/analysis/schemas";

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

  async deleteOneAnalysisById(
    analysisId: PatientAnalysis["id"]
  ): Promise<string> {
    try {
      return await fetchAndValidateSchema(
        () => api.delete(`/analysis/${analysisId}`),
        deleteAnalysisPatientResponse
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async createAnalysis(
    analyzePyload: AnalyzePyload
  ): Promise<CreateAnalysisRespnse> {
    try {
      return await fetchAndValidateSchema(
        () => apiPython.post("/analyze", analyzePyload),
        createAnalysisResponse
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const analysisApi = new AnalysisApi();
