import z from "zod";
import {
  loginPayloadSchema,
  loginResponseSchema,
} from "../schemas/auth.schema";

export type LoginPayload = z.infer<typeof loginPayloadSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
