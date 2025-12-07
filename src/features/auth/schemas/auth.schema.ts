import z from "zod";

export const profileSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  userName: z.string(),
  role: z.enum(["admin", "doctor"]),
});

export const loginPayloadSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  token: z.string(),
});
