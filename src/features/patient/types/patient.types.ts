import type z from "zod";
import type { createPatientSchema, patientSchema } from "../schemas";

export type Patient = z.infer<typeof patientSchema>;
export type CreatePatient = z.infer<typeof createPatientSchema>;
