import { analysisApi } from "@/api/analysis-api";
import type { Patient } from "@/features/patient/types/patient.types";
import { useQuery } from "@tanstack/react-query";

type UseGetAnalysisByPatientIdType = {
  patientId: Patient["id"];
};

export default function useGetAnalysisByPatientId({
  patientId,
}: UseGetAnalysisByPatientIdType) {
  const { isFetching, data } = useQuery({
    queryKey: ["patient-analysisa", patientId],
    queryFn: () => analysisApi.getAnalysisByPatientId(patientId),
  });
  return { isFetching, data };
}
