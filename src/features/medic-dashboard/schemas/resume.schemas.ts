import z from "zod";

export const healthyCasesSchema = z.object({
  cases: z.number(),
  percentaje: z.number(),
});

export const alzheimerCasesSchema = z.object({
  cases: z.number(),
  percentaje: z.number(),
});

export const distributionDiagnosticSchema = z.object({
  healthy: z.number(),
  lowAlzheimer: z.number(),
  moderateAlzheimer: z.number(),
  severeAlzheimer: z.number(),
});

export const resumeSchema = z.object({
  totalAnalysis: z.number(),
  healthyCases: healthyCasesSchema,
  alzheimerCases: alzheimerCasesSchema,
  averageAge: z.number(),
  distributionDiagnostic: distributionDiagnosticSchema,
});
