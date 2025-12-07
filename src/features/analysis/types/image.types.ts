import type z from "zod";
import type { imageAnalysisSchema, imageSchema } from "../schemas";

export type Image = z.infer<typeof imageSchema>;
export type ImageAnalysis = z.infer<typeof imageAnalysisSchema>;
