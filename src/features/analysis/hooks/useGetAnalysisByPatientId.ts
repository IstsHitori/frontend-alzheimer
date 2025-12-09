import { analysisApi } from "@/api/analysis-api";
import type { Patient } from "@/features/patient/types/patient.types";
import { useQuery } from "@tanstack/react-query";

type UseGetAnalysisByPatientIdType = {
  patientId: Patient["id"];
};

export default function useGetAnalysisByPatientId({
  patientId,
}: UseGetAnalysisByPatientIdType) {
  const { isFetching, isError, data, error } = useQuery({
    queryKey: ["patient-analysis", patientId],
    queryFn: () => analysisApi.getAnalysisByPatientId(patientId),
    staleTime: 10 * 60 * 1000,
  });
  return { isFetching, isError, data, error };
}
