import type z from "zod";
import type { activitySchema } from "../schemas";

export enum ACTIVITY_TYPE {
  //YA
  ANALYSIS = "Analisis completado",
  //YA
  UPDATE_PATIENT = "Actualizar Paciente",
  //YA
  CREATE_PATIENT = "Crear Paciente",
  //YA
  MONTHLY_REPORT = "Reporte Mensual",
  //YA
  USER_REPORT = "Reporte de usuario",
  //YA
  ANALYSIS_REPORT = "Reporte de analisis",
}

export type Activity = z.infer<typeof activitySchema>;
