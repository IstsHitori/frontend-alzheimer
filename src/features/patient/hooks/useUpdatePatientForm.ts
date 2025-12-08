import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePatientSchema } from "../schemas";
import type { Patient } from "../types";

export function useUpdatePatientForm(patient: Patient) {
  const defaultValues = {
    id: patient.id,
    identification: patient.personalInfo.identification,
    telephone: patient.personalInfo.telephone,
    fullName: patient.personalInfo.fullName,
    birthDate: patient.personalInfo.birthDate,
    gender: patient.personalInfo.gender,
    educationLevel: patient.personalInfo.educationLevel,
    weight: patient.physicalData.weight.toString(),
    size: patient.physicalData.size.toString(),
    tension: patient.physicalData.tension.toString(),
    eps: patient.eps.id.toString(),
    conditions: patient.currentConditions.map((c) => ({
      id: c.id,
      code: c.code,
      name: c.name,
      description: c.description,
      extra: "",
    })),
    currentMedications: patient.currentMedications.map((m) => ({
      id: m.id,
      product: m.product,
      expedient: m.id.toString(),
      headline: "",
      healthRegistry: "",
      commercialDescription: "",
      atc: "",
      descriptionAtc: "",
      medicalSample: false,
      viaAdministration: m.administrationRoute,
      unitMeasurement: "",
      quantity: 0,
      referenceUnit: "",
      pharmaceuticalForm: m.pharmaceuticalForm,
    })),
    familyBackground: patient.familyBackgrounds.map((f) => ({
      id: f.id,
      code: f.code,
      name: f.name,
      description: f.description,
      extra: "",
    })),
    symptomsPresent: patient.symptoms,
  };

  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(updatePatientSchema),
    defaultValues,
  });

  return { control, handleSubmit, setValue, watch };
}
