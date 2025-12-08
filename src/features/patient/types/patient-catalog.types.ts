import type z from "zod";
import type { conditionSchema, epsSchema, medicationSchema } from "../schemas";

export type Eps = z.infer<typeof epsSchema>;

export type Medication = z.infer<typeof medicationSchema>;

export type Condition = z.infer<typeof conditionSchema>;
