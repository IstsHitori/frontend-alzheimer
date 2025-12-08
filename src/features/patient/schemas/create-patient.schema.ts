import z from "zod";
import { EDUCATION_LEVEL, PATIENT_GENDER } from "./patient.schemas";

// Schema interno para recibir objetos completos del catálogo
const conditionInputSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
  extra: z.string(),
});

const medicationInputSchema = z.object({
  id: z.number(),
  product: z.string(),
  expedient: z.string(),
  headline: z.string(),
  healthRegistry: z.string(),
  commercialDescription: z.string(),
  atc: z.string(),
  descriptionAtc: z.string(),
  medicalSample: z.boolean(),
  viaAdministration: z.string(),
  unitMeasurement: z.string(),
  quantity: z.number(),
  referenceUnit: z.string(),
  pharmaceuticalForm: z.string(),
});

const familyBackgroundInputSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
  extra: z.string(),
});

// Schemas transformados para enviar solo los campos necesarios
const conditionSchema = conditionInputSchema.transform((val) => ({
  code: val.code,
}));

const currentMedicationSchema = medicationInputSchema.transform((val) => ({
  expedient: val.expedient,
}));

const familyBackgroundSchema = familyBackgroundInputSchema.transform((val) => ({
  code: val.code,
}));

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
  birthDate: z
    .string()
    .min(1, "La fecha de nacimiento es requerida")
    .refine((val) => {
      const birthDate = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 5;
      }
      return age >= 5;
    }, "El paciente debe tener al menos 5 años de edad"),
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
    .min(1, "Seleccione una EPS")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), "El EPS debe ser un número válido")
    .refine((val) => val > 0, "El EPS debe ser positivo"),
  conditions: z.array(conditionSchema).default([]),
  currentMedications: z.array(currentMedicationSchema).default([]),
  familyBackground: z.array(familyBackgroundSchema).default([]),
  symptomsPresent: symptomsPresentSchema,
});

export const updatePatientSchema = createPatientSchema.extend({
  id: z.uuid("El ID no es válido"),
});
