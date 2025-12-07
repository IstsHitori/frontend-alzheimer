import { useQuery } from "@tanstack/react-query";
import { medicalDashboardApi } from "@/api/medical-dashboard-api";
import { useMedicalDashboardStore } from "../store/medical-dashboard.store";

export function useMedicalDashboard() {
  const medicalStats = useMedicalDashboardStore((state) => state.medicalStats);
  const setMedicalStats = useMedicalDashboardStore(
    (state) => state.setMedicalStats
  );

  const medicalQuery = useQuery({
    queryKey: ["medical-dashoard-stats"],
    queryFn: medicalDashboardApi.getMedicalDashboardStats,
    staleTime: 1000 * 60 * 3,
  });

  return { medicalStats, medicalQuery, setMedicalStats };
}
