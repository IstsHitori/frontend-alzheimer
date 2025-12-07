import type z from "zod";

import type { homeDashboardStatsSchema } from "../schemas/home.schemas";

export type HomeDashboardStats = z.infer<typeof homeDashboardStatsSchema>;
