import type z from "zod";
import { SchemaValidationError } from "../errors";

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
