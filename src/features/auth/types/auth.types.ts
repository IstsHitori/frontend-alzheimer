import z from "zod";
import {
  loginPayloadSchema,
  loginResponseSchema,
  profileSchema,
} from "../schemas/auth.schema";
export type Profile = z.infer<typeof profileSchema>;
export type LoginPayload = z.infer<typeof loginPayloadSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
