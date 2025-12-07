import z from "zod";
import { analysisStatsSchema, resumeSchema } from ".";

export const medicDashboardSchema = z.object({
  resumeStats: resumeSchema,
  analysisStats: analysisStatsSchema,
});
