import type z from "zod";
import type {
  cloudinaryImageResponseSchema,
  imageAnalysisSchema,
  imageSchema,
} from "../schemas";

export type Image = z.infer<typeof imageSchema>;
export type ImageAnalysis = z.infer<typeof imageAnalysisSchema>;
export type CloudinaryImage = z.infer<typeof cloudinaryImageResponseSchema>;
