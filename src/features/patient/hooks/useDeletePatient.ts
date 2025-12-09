import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Patient } from "../types";
import { patientApi } from "@/api";
import { toast } from "sonner";
import { handleErrorToast } from "@/shared/helpers/error-handler";

export default function useDeletePatient() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (patientId: Patient["id"]) => {
      return patientApi.deletePatient(patientId);
    },
    onSuccess: (message: string, patientId) => {
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      queryClient.invalidateQueries({
        queryKey: ["patient", patientId],
      });
    },
    onError: (error) => handleErrorToast(error),
  });

  return { mutate };
}
