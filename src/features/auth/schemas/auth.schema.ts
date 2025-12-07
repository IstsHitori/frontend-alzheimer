import z from "zod";

export const loginPayloadSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  token: z.string(),
});
