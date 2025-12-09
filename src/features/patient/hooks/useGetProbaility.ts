import type { PatientImageAnalysis } from "@/features/analysis/types";
import { useMemo } from "react";

export type ProbabilityItem = {
  label: string;
  value: number;
  severity: number;
  color: string;
  bgColor: string;
  borderColor: string;
};

export function useGetProbability(
  imgAnalysis: PatientImageAnalysis,
  diagnosis: string
) {
  const probabilities = useMemo<ProbabilityItem[]>(
    () => [
      {
        label: "Alzheimer severo",
        value: imgAnalysis.moderateDemented,
        severity: 3,
        color: "text-red-700",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      },
      {
        label: "Alzheimer Leve",
        value: imgAnalysis.mildDemented,
        severity: 2,
        color: "text-amber-700",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
      },
      {
        label: "Alzheimer muy leve",
        value: imgAnalysis.veryMildDemented,
        severity: 1,
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
      },
      {
        label: "No demente",
        value: imgAnalysis.nonDemented,
        severity: 0,
        color: "text-green-700",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      },
    ],
    [
      imgAnalysis.moderateDemented,
      imgAnalysis.mildDemented,
      imgAnalysis.veryMildDemented,
      imgAnalysis.nonDemented,
    ]
  );

  const primaryDiagnosis = useMemo(() => {
    const found = probabilities.find(
      (prob) => prob.label.toLowerCase() === diagnosis.toLowerCase()
    );
    return found || probabilities[0];
  }, [probabilities, diagnosis]);

  return {
    probabilities,
    primaryDiagnosis,
  };
}
