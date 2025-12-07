import type z from "zod";
import type { patientSchema } from "../schemas/patient.schemas";

export type Patient = z.infer<typeof patientSchema>;
