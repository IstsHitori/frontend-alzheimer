import type {
  CreatePatient,
  Patient,
  UpdateCognitiveEvaluation,
  UpdatePatient,
} from "@/features/patient/types/patient.types";
import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { api } from "./base-http";
import {
  arrayPatientSchema,
  crudPatientResponseSchema,
} from "@/features/patient/schemas/patient.schemas";

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

  async createPatient(newPatient: CreatePatient): Promise<string> {
    try {
      return await fetchAndValidateSchema(
        () => api.post("/patient", newPatient),
        crudPatientResponseSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async updatePatient({ id, ...restPatient }: UpdatePatient): Promise<string> {
    try {
      return await fetchAndValidateSchema(
        () => api.patch(`/patient/${id}`, restPatient),
        crudPatientResponseSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async deletePatient(patientId: Patient["id"]): Promise<string> {
    try {
      return await fetchAndValidateSchema(
        () => api.delete(`/patient/${patientId}`),
        crudPatientResponseSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async updateCognitiveEvaluation(
    newEvaluation: UpdateCognitiveEvaluation,
    patientId: Patient["id"]
  ): Promise<string> {
    try {
      return await fetchAndValidateSchema(
        () => api.patch(`/patient/evaluation/${patientId}`, newEvaluation),
        crudPatientResponseSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const patientApi = new PatientApi();
