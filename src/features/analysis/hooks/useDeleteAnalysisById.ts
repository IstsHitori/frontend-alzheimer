import { handleErrorToast } from "@/shared/helpers/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PatientAnalysis } from "../types";
import { analysisApi } from "@/api";
import { toast } from "sonner";

export function useDeleteAnalysisById() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (analysisId: PatientAnalysis["id"]) =>
      analysisApi.deleteOneAnalysisById(analysisId),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["patient-analysis"],
      });
    },
    onError: (error) => handleErrorToast(error),
  });
  return { mutate };
}
