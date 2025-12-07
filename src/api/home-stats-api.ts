import type { HomeDashboardStats } from "@/features/home-dashboard/types/home.types";
import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { api } from "./base-http";
import { homeDashboardStatsSchema } from "@/features/home-dashboard/schemas/home.schemas";

class HomeApi {
  async getHomeStats(): Promise<HomeDashboardStats> {
    try {
      return await fetchAndValidateSchema<HomeDashboardStats>(
        () => api.get("/stats/home-stats"),
        homeDashboardStatsSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const homeApi = new HomeApi();
