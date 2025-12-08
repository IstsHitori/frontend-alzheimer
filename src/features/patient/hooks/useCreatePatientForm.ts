import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPatientSchema,
  EDUCATION_LEVEL,
  PATIENT_GENDER,
} from "../schemas";

export function useCreatePatientForm() {
  const defaultValues = {
    identification: "",
    telephone: "",
    fullName: "",
    birthDate: "",
    gender: PATIENT_GENDER.MALE,
    educationLevel: EDUCATION_LEVEL.PRIMARY,
    weight: "",
    size: "",
    tension: "",
    eps: "",
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
