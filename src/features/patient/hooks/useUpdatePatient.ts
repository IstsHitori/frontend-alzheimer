import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdatePatient } from "../types";
import { patientApi } from "@/api";
import { toast } from "sonner";
import { handleErrorToast } from "@/shared/helpers/error-handler";

export default function useUpdatePatient() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (patient: UpdatePatient) => {
      return patientApi.updatePatient(patient);
    },
    onSuccess: (message: string, { id }) => {
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      queryClient.invalidateQueries({
        queryKey: ["patient", id],
      });
    },
    onError: (error) => handleErrorToast(error),
  });

  return { mutate };
}
