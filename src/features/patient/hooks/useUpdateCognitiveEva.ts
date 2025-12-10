import { patientApi } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Patient, UpdateCognitiveEvaluation } from "../types";
import { toast } from "sonner";
import { handleErrorToast } from "@/shared/helpers/error-handler";
import { usePatientStore } from "../store/patient.store";

type useUpdateCognitiveEvaProps = {
  newEvaluation: UpdateCognitiveEvaluation;
  patientId: Patient["id"];
};
export function useUpdateCognitiveEva() {
  const queryClient = useQueryClient();
  const patients = usePatientStore((state) => state.patients);
  const setPatients = usePatientStore((state) => state.setPatients);

  const { mutate } = useMutation({
    mutationFn: ({ newEvaluation, patientId }: useUpdateCognitiveEvaProps) =>
      patientApi.updateCognitiveEvaluation(newEvaluation, patientId),
    onSuccess: (data, { patientId, newEvaluation }) => {
      // Actualizar el store de Zustand optimísticamente
      const updatedPatients = patients.map((patient) => {
        if (patient.id === patientId) {
          return {
            ...patient,
            cognitiveEvaluation: {
              ...patient.cognitiveEvaluation,
              mmse: newEvaluation.mmse,
              moca: newEvaluation.moca,
              updatedAt: new Date().toISOString(),
            },
          };
        }
        return patient;
      });
      setPatients(updatedPatients);

      // Invalidar queries para refetch desde el servidor
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
