import { isAxiosError } from "axios";
import type z from "zod";
import { ApiError, SchemaValidationError } from "../errors";

export async function fetchAndValidateSchema<T>(
  request: () => Promise<{ data: unknown }>,
  schema: z.ZodType<T>,
  errorMessage: string = "El formato de respuesta del servidor es invalido"
): Promise<T> {
  const response = await request();

  const result = await schema.safeParseAsync(response.data);

  if (!result.success)
    throw new SchemaValidationError(errorMessage, result.error);
  return result.data;
}

export function handleAxiosError(error: unknown): never {
  
  if (isAxiosError(error)) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Error en el servidor";
    throw new ApiError(message, status);
  }

  throw error;
}
