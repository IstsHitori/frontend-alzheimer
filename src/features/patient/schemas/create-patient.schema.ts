import z from "zod";
import { PATIENT_GENDER } from "./patient.schemas";

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
  identification: z.string().min(1, "La identificación es requerida"),
  telephone: z.string().min(1, "El teléfono es requerido"),
  fullName: z.string().min(1, "El nombre completo es requerido"),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida"),
  gender: z.enum(PATIENT_GENDER, "Ingrese un género válido"),
  educationLevel: z.string().min(1, "El nivel de educación es requerido"),
  weight: z.number().positive("El peso debe ser un número positivo"),
  size: z.number().positive("La talla debe ser un número positivo"),
  tension: z.number().positive("La tensión debe ser un número positivo"),
  eps: z.number().positive("El EPS debe ser un número positivo"),
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
