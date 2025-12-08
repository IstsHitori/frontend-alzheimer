import z from "zod";

export enum PATIENT_GENDER {
  MALE = "masculino",
  FEMALE = "femenino",
}

export enum EDUCATION_LEVEL {
  PRIMARY = "primaria",
  SECONDARY = "secundaria",
  COLLEGE = "universidad",
  POSTGRADUATE = "postgrado",
}

export const patientSchema = z.object({
  id: z.uuid(),
  personalInfo: z.object({
    identification: z.string(),
    telephone: z.string(),
    fullName: z.string(),
    birthDate: z.string(),
    age: z.number(),
    gender: z.enum(PATIENT_GENDER),
    educationLevel: z.enum(EDUCATION_LEVEL),
  }),
  physicalData: z.object({
    weight: z.number(),
    size: z.number(),
    tension: z.number(),
  }),
  eps: z.object({
    id: z.number(),
    entity: z.string(),
    regime: z.string(),
    code: z.string(),
  }),
  currentConditions: z.array(
    z.object({
      id: z.number(),
      code: z.string(),
      name: z.string(),
      description: z.string(),
    })
  ),
  familyBackgrounds: z.array(
    z.object({
      id: z.number(),
      code: z.string(),
      name: z.string(),
      description: z.string(),
    })
  ),
  currentMedications: z.array(
    z.object({
      id: z.number(),
      product: z.string(),
      expedient: z.string(),
      laboratory: z.string(),
      pharmaceuticalForm: z.string(),
      administrationRoute: z.string(),
    })
  ),
  symptoms: z.object({
    memoryLoss: z.boolean(),
    lenguageProblems: z.boolean(),
    difficultyWithTasks: z.boolean(),
    disorientation: z.boolean(),
    personalityChanges: z.boolean(),
    temporalConfusion: z.boolean(),
  }),
  cognitiveEvaluation: z.object({
    id: z.number(),
    mmse: z.number(),
    moca: z.number(),
    updatedAt: z.string(),
  }),
  timestamps: z.object({
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const crudPatientResponseSchema = z.string();

export const arrayPatientSchema = z.array(patientSchema);
