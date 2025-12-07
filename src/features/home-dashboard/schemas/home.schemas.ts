import { z } from "zod";

export const homeDashboardStatsSchema = z.object({
  analysisTotal: z.number().int().nonnegative(),
  patients: z.number().int().nonnegative(),
  reports: z.number().int().nonnegative(),
  IAPresicion: z.number().min(0).max(1),
});
