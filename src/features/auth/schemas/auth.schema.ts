import { USER_ROLE } from "@/features/administration/schemas/user.schemas";
import z from "zod";

export const profileSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  userName: z.string(),
  role: z.enum(USER_ROLE),
});

export const loginPayloadSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  token: z.string(),
});
