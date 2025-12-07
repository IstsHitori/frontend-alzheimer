import type z from "zod";
import type { activitySchema } from "../schemas";

export type Activity = z.infer<typeof activitySchema>;
