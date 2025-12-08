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
  identification: z.number(),
  telephone: z.number(),
  fullName: z.string().min(1, "El nombre completo es requerido"),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida"),
  gender: z.enum(PATIENT_GENDER, "Ingrese un género válido"),
  educationLevel: z.enum(
    EDUCATION_LEVEL,
    "Ingrese un nivel de educación válido"
  ),
  weight: z.number(),
  size: z.number(),
  tension: z.number(),
  eps: z.number(),
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
