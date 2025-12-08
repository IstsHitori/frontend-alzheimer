import type { Condition, Eps, Medication } from "@/features/patient/types";
import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { api } from "./base-http";
import {
  arrayConditionSchema,
  arrayEpsSchema,
  arrayMedicationSchema,
} from "@/features/patient/schemas";

class CatalogApi {
  async getAllEps(): Promise<Eps[]> {
    try {
      return await fetchAndValidateSchema(
        () => api.get<Eps[]>("/catalog/eps"),
        arrayEpsSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async getAllConditions(): Promise<Condition[]> {
    try {
      return await fetchAndValidateSchema(
        () => api.get("/catalog/conditions"),
        arrayConditionSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async getConditionsBySearch(searchParam: string): Promise<Condition[]> {
    try {
      return await fetchAndValidateSchema(
        () => api.get(`/catalog/conditions/search?search=${searchParam}`),
        arrayConditionSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async getAllMedicatios(): Promise<Medication[]> {
    try {
      return await fetchAndValidateSchema(
        () => api.get("/catalog/medications"),
        arrayMedicationSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async getMedicationsBySearch(searchParam: string): Promise<Medication[]> {
    try {
      return await fetchAndValidateSchema(
        () => api.get(`/catalog/medications/search?search=${searchParam}`),
        arrayMedicationSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const catalogApi = new CatalogApi();
