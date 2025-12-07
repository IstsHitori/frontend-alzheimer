import type z from "zod";
import type { medicDashboardSchema } from "../schemas";

export type MedicDashboard = z.infer<typeof medicDashboardSchema>;
