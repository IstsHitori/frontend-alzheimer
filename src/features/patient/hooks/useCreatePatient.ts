import { patientApi } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { CreatePatient } from "../types";
import { handleErrorToast } from "@/shared/helpers/error-handler";
import { toast } from "sonner";

export function useCreatePatient(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const [isCreating, setIscreating] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (newPatient: CreatePatient) =>
      patientApi.createPatient(newPatient),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      onSuccess?.();
    },
    onError: (error) => handleErrorToast(error),
  });
  return { isCreating, setIscreating, mutate };
}
