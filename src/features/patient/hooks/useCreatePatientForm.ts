import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPatientSchema, PATIENT_GENDER } from "../schemas";

export function useCreatePatientForm() {
  const defaultValues = {
    identification: "",
    telephone: "",
    fullName: "",
    birthDate: "",
    gender: PATIENT_GENDER.MALE,
    educationLevel: "",
    weight: 0,
    size: 0,
    tension: 0,
    eps: 0,
    conditions: [],
    currentMedications: [],
    familyBackground: [],
    symptomsPresent: {
      memoryLoss: false,
      lenguageProblems: false,
      difficultyWithTasks: false,
      disorientation: false,
      personalityChanges: false,
      temporalConfusion: false,
    },
  };

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(createPatientSchema),
    defaultValues,
  });
  return { control, handleSubmit, reset };
}
