import type z from "zod";
import type { imageAnalysisSchema, patientAnalysis } from "../schemas";

export type PatientImageAnalysis = z.infer<typeof imageAnalysisSchema>;
export type PatientAnalysis = z.infer<typeof patientAnalysis>;
