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

export const deleteAnalysisPatientResponse = z.string();

export const arrayPatientAnalysis = z.array(patientAnalysis);
