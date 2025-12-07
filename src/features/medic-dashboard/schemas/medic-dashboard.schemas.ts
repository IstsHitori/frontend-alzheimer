import z from "zod";
import { analysisStatsSchema, resumeSchema } from ".";

export const medicDashboardSchema = z.object({
  resume: resumeSchema,
  analysisStats: analysisStatsSchema,
});
