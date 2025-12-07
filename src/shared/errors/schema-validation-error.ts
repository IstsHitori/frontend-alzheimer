import type z from "zod";

export class SchemaValidationError extends Error {
  public readonly zodError: z.ZodError;
  constructor(message: string, zodError: z.ZodError) {
    super(message);
    this.name = "SchemaValidationError";
    this.zodError = zodError;
  }
}
