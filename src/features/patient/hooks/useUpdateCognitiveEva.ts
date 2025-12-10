import { patientApi } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Patient, UpdateCognitiveEvaluation } from "../types";
import { toast } from "sonner";
import { handleErrorToast } from "@/shared/helpers/error-handler";

type useUpdateCognitiveEvaProps = {
  newEvaluation: UpdateCognitiveEvaluation;
  patientId: Patient["id"];
};
export function useUpdateCognitiveEva() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ newEvaluation, patientId }: useUpdateCognitiveEvaProps) =>
      patientApi.updateCognitiveEvaluation(newEvaluation, patientId),
    onSuccess: (data, { patientId }) => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      queryClient.invalidateQueries({
        queryKey: ["patient", patientId],
      });
      toast.success(data);
    },
    onError: (error) => handleErrorToast(error),
  });
  return { mutate };
}
