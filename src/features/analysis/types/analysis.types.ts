import type z from "zod";
import type { patientAnalysis } from "../schemas";

export type PatientAnalysis = z.infer<typeof patientAnalysis>;
