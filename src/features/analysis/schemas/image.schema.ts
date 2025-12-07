import z from "zod";

export const imageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
  fileName: z.string(),
  createdAt: z.string(),
});

export const imageAnalysisSchema = z.object({
  id: z.number(),
  image: imageSchema,
  diagnosis: z.string(),
  nonDemented: z.number(),
  veryMildDemented: z.number(),
  mildDemented: z.number(),
  moderateDemented: z.number(),
});
