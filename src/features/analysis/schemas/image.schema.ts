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

export const cloudinaryImageResponseSchema = z.object({
  asset_id: z.string(),
  public_id: z.string(),
  version: z.number(),
  version_id: z.string(),
  signature: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
  resource_type: z.string(),
  created_at: z.string(),
  tags: z.array(z.string()),
  bytes: z.number(),
  type: z.string(),
  etag: z.string(),
  placeholder: z.boolean(),
  url: z.string(),
  secure_url: z.string(),
  asset_folder: z.string(),
  display_name: z.string(),
  original_filename: z.string(),
  api_key: z.string(),
});

export const arrayCloudinaryImageResponseSchema = z.array(
  cloudinaryImageResponseSchema
);
