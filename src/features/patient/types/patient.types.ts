import type z from "zod";
import type {
  createPatientSchema,
  patientSchema,
  updateCognitiveEvaluationSchema,
  updatePatientSchema,
} from "../schemas";

export type Patient = z.infer<typeof patientSchema>;
export type CreatePatient = z.infer<typeof createPatientSchema>;
export type UpdatePatient = z.infer<typeof updatePatientSchema>;
export type UpdateCognitiveEvaluation = z.infer<
  typeof updateCognitiveEvaluationSchema
>;
