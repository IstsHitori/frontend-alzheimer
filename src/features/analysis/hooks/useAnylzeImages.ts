import { analysisApi } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AnalyzePyload } from "../types";
import { handleErrorToast } from "@/shared/helpers/error-handler";

export default function useAnylzeImages() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (payload: AnalyzePyload) => analysisApi.createAnalysis(payload),
    onSuccess: (data, { patientId }) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["patient-analysis", patientId],
      });
    },
    onError: (error) => {
      handleErrorToast(error);
    },
  });
  return { mutate };
}
