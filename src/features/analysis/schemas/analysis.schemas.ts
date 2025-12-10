import z from "zod";
import { imageAnalysisSchema } from "./image.schema";

const userAnalysisSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  userName: z.string(),
  role: z.string(),
});

export const patientAnalysis = z.object({
  id: z.number(),
  user: userAnalysisSchema,
  imageAnalysis: z.array(imageAnalysisSchema),
  createdAt: z.string(),
});

export const imageToAnalyze = z.object({
  fileUrl: z.string(),
  fileName: z.string(),
});

export const analyzePyload = z.object({
  patientId: z.string(),
  token: z.string(),
  images: z.array(imageToAnalyze),
});

export const deleteAnalysisPatientResponse = z.string();

export const createAnalysisResponse = z.object({
  id: z.number(),
  user: userAnalysisSchema,
  patient: z.object({
    id: z.string(),
    identification: z.string(),
    telephone: z.string(),
    fullName: z.string(),
    birthDate: z.string(),
    age: z.number(),
    birthDays: z.number(),
    weight: z.number(),
    size: z.number(),
    tension: z.number(),
    gender: z.string(),
    educationLevel: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  imageAnalysis: z.array(imageAnalysisSchema),
  createdAt: z.string(),
});

export const arrayPatientAnalysis = z.array(patientAnalysis);
