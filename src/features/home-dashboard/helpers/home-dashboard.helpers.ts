import { Activity, BarChart3, Brain, Stethoscope } from "lucide-react";
import { ACTIVITY_TYPE } from "../types";

export const getTimeAgo = (createdAt: string): string => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffInMs = now.getTime() - created.getTime();

  if (diffInMs < 0) {
    return "justo ahora";
  }

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `hace ${diffInDays} ${diffInDays === 1 ? "día" : "días"}`;
  }
  if (diffInHours > 0) {
    return `hace ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`;
  }
  if (diffInMinutes > 0) {
    return `hace ${diffInMinutes} ${
      diffInMinutes === 1 ? "minuto" : "minutos"
    }`;
  }
  if (diffInSeconds > 0) {
    return `hace ${diffInSeconds} ${
      diffInSeconds === 1 ? "segundo" : "segundos"
    }`;
  }

  return "justo ahora";
};

// Configuración de actividades
const ACTIVITY_CONFIG = {
  [ACTIVITY_TYPE.ANALYSIS]: {
    icon: Brain,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  [ACTIVITY_TYPE.MONTHLY_REPORT]: {
    icon: BarChart3,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  [ACTIVITY_TYPE.USER_REPORT]: {
    icon: BarChart3,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  [ACTIVITY_TYPE.ANALYSIS_REPORT]: {
    icon: BarChart3,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  [ACTIVITY_TYPE.CREATE_PATIENT]: {
    icon: Stethoscope,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  [ACTIVITY_TYPE.UPDATE_PATIENT]: {
    icon: Stethoscope,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
};

const DEFAULT_ACTIVITY_CONFIG = {
  icon: Activity,
  color: "text-gray-600",
  bg: "bg-gray-100",
};

export function getActivityConfig(type: string) {
  return (
    ACTIVITY_CONFIG[type as keyof typeof ACTIVITY_CONFIG] ||
    DEFAULT_ACTIVITY_CONFIG
  );
}
