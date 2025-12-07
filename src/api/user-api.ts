import type {
  CreateUser,
  UpdateUser,
  User,
} from "@/features/administration/types/user.types";
import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { api } from "./base-http";
import {
  arrayUserSchema,
  crudUserResponse,
} from "@/features/administration/schemas/user.schemas";

class UserApi {
  async getAllUsers(): Promise<User[]> {
    try {
      return await fetchAndValidateSchema<User[]>(
        () => api.get("/user"),
        arrayUserSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async createUser(newUser: CreateUser): Promise<string> {
    try {
      return await fetchAndValidateSchema<string>(
        () => api.post("/user", newUser),
        crudUserResponse
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async updateUser({ id, ...restUser }: UpdateUser): Promise<string> {
    try {
      return await fetchAndValidateSchema<string>(
        () => api.patch(`/user/${id}`, restUser),
        crudUserResponse
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async deleteUser(userId: User["id"]): Promise<string> {
    try {
      return await fetchAndValidateSchema<string>(
        () => api.delete(`/user/${userId}`),
        crudUserResponse
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const userApi = new UserApi();
