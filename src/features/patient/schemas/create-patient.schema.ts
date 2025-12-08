import z from "zod";
import { EDUCATION_LEVEL, PATIENT_GENDER } from "./patient.schemas";

const conditionSchema = z.object({
  code: z.string().min(1, "El código de la condición es requerido"),
});

const currentMedicationSchema = z.object({
  expedient: z.string().min(1, "El expediente del medicamento es requerido"),
});

const familyBackgroundSchema = z.object({
  code: z.string().min(1, "El código del antecedente es requerido"),
});

const symptomsPresentSchema = z.object({
  memoryLoss: z.boolean(),
  lenguageProblems: z.boolean(),
  difficultyWithTasks: z.boolean(),
  disorientation: z.boolean(),
  personalityChanges: z.boolean(),
  temporalConfusion: z.boolean(),
});

export const createPatientSchema = z.object({
  identification: z
    .string()
    .regex(/^\d{6,10}$/, "La identificación debe tener entre 6 y 10 números")
    .transform((val) => parseInt(val, 10)),
  telephone: z
    .string()
    .regex(/^\d{10}$/, "El teléfono debe tener exactamente 10 números")
    .transform((val) => parseInt(val, 10)),
  fullName: z.string().min(1, "El nombre completo es requerido"),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida"),
  gender: z.enum(PATIENT_GENDER, "Ingrese un género válido"),
  educationLevel: z.enum(
    EDUCATION_LEVEL,
    "Ingrese un nivel de educación válido"
  ),
  weight: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "El peso debe ser un número válido")
    .refine((val) => val > 0, "El peso debe ser positivo"),
  size: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "La altura debe ser un número válido")
    .refine((val) => val > 0, "La altura debe ser positiva"),
  tension: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "La tensión debe ser un número válido")
    .refine((val) => val > 0, "La tensión debe ser positiva"),
  eps: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), "El EPS debe ser un número válido")
    .refine((val) => val > 0, "El EPS debe ser positivo"),
  conditions: z
    .array(conditionSchema)
    .min(1, "Al menos una condición es requerida"),
  currentMedications: z
    .array(currentMedicationSchema)
    .min(1, "Al menos un medicamento es requerido"),
  familyBackground: z
    .array(familyBackgroundSchema)
    .min(1, "Al menos un antecedente es requerido"),
  symptomsPresent: symptomsPresentSchema,
});
