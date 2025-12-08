import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdatePatient } from "../types";
import { patientApi } from "@/api";
import { toast } from "sonner";

export default function useUpdatePatient() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (patient: UpdatePatient) => patientApi.updatePatient(patient),
    onSuccess: (message, { id }) => {
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      queryClient.invalidateQueries({
        queryKey: ["patient", id],
      });
    },
  });

  return { mutate };
}
