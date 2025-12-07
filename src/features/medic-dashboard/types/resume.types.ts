import type z from "zod";
import type {
  alzheimerCasesSchema,
  distributionDiagnosticSchema,
  healthyCasesSchema,
  resumeSchema,
} from "../schemas";

export type HealthyCases = z.infer<typeof healthyCasesSchema>;
export type AlzheimerCases = z.infer<typeof alzheimerCasesSchema>;
export type DistributionDiagnostic = z.infer<
  typeof distributionDiagnosticSchema
>;
export type Resume = z.infer<typeof resumeSchema>;
