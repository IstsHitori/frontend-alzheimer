import z from "zod";

export const analysisByGenderSchema = z.object({
  male: z.number(),
  female: z.number(),
});

export const accuracyMetricsSchema = z.object({
  modelAccuracy: z.number(),
  modelSpecificity: z.number(),
});

export const analysisStatsSchema = z.object({
  analysisByGender: analysisByGenderSchema,
  accuracyMetrics: accuracyMetricsSchema.optional(),
});
