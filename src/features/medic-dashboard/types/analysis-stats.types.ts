import type z from "zod";
import type {
  accuracyMetricsSchema,
  analysisByGenderSchema,
  analysisStatsSchema,
} from "../schemas";

export type AnalysisByGender = z.infer<typeof analysisByGenderSchema>;
export type AccuracyMetrics = z.infer<typeof accuracyMetricsSchema>;
export type AnalysisStats = z.infer<typeof analysisStatsSchema>;
