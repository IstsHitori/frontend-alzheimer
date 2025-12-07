import { toast } from "sonner";
import { ApiError, SchemaValidationError } from "../errors";

export function handleErrorToast(error: unknown): void {
  if (error instanceof ApiError) {
    toast.error(`Error del servidor:\n${error.message}`);
  } else if (error instanceof SchemaValidationError) {
    toast.error(error.message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Ocurrió un error desconocido");
  }
}
