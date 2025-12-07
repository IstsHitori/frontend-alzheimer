import { isAxiosError } from "axios";
import type {
  LoginPayload,
  LoginResponse,
} from "@/features/auth/types/auth.types";
import { ApiError } from "@/shared/errors";
import { fetchAndValidateSchema } from "@/shared/helpers";
import { api } from "./base-http";
import { loginResponseSchema } from "@/features/auth/schemas/auth.schema";

class AuthApi {
  async login(payload: LoginPayload): Promise<string> {
    try {
      const response = await fetchAndValidateSchema<LoginResponse>(
        () => api.post("/auth/login", payload),
        loginResponseSchema
      );

      return response.token;
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Error en el servidor";
        throw new ApiError(message, status);
      }
      throw error;
    }
  }
}

export const authApi = new AuthApi();
