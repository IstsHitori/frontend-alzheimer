import type { MedicDashboard } from "@/features/medic-dashboard/types";
import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { api } from "./base-http";
import { medicDashboardSchema } from "@/features/medic-dashboard/schemas";

class MedicalDashboardApi {
  async getMedicalDashboardStats(): Promise<MedicDashboard> {
    try {
      return await fetchAndValidateSchema<MedicDashboard>(
        () => api.get("/stats/medical-dashboard-stats"),
        medicDashboardSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const medicalDashboardApi = new MedicalDashboardApi()
