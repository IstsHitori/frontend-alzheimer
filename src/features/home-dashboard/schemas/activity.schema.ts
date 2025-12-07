import z from "zod";

export const activitySchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  type: z.string(),
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    userName: z.string(),
    role: z.string(),
  }),
  createdAt: z.string(),
});

export const arrayActivitySchema = z.array(activitySchema);
