import type z from "zod";
import type {
  analyzePyload,
  createAnalysisResponse,
  imageAnalysisSchema,
  imageToAnalyze,
  patientAnalysis,
} from "../schemas";

export type PatientImageAnalysis = z.infer<typeof imageAnalysisSchema>;
export type PatientAnalysis = z.infer<typeof patientAnalysis>;
export type ImageToAnlize = z.infer<typeof imageToAnalyze>;
export type AnalyzePyload = z.infer<typeof analyzePyload>;
export type CreateAnalysisRespnse = z.infer<typeof createAnalysisResponse>