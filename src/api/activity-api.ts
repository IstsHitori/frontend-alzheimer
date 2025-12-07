import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { api } from "./base-http";
import { arrayActivitySchema } from "@/features/home-dashboard/schemas";
import type { Activity } from "@/features/home-dashboard/types";

class ActivityApi {
  async getActivities(): Promise<Activity[]> {
    try {
      return await fetchAndValidateSchema<Activity[]>(
        () => api.get("/activity"),
        arrayActivitySchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const activityApi = new ActivityApi();
