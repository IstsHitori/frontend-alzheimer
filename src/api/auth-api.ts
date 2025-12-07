import type {
  LoginPayload,
  LoginResponse,
  Profile,
} from "@/features/auth/types/auth.types";
import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { api } from "./base-http";
import {
  loginResponseSchema,
  profileSchema,
} from "@/features/auth/schemas/auth.schema";

class AuthApi {
  async login(payload: LoginPayload): Promise<string> {
    try {
      const response = await fetchAndValidateSchema<LoginResponse>(
        () => api.post("/auth/login", payload),
        loginResponseSchema
      );

      return response.token;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async getProfile(): Promise<Profile> {
    try {
      return await fetchAndValidateSchema<Profile>(
        () => api.get("/auth/profile"),
        profileSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const authApi = new AuthApi();
