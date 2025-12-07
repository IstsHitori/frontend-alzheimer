import { useState } from "react";
import type { MedicDashboard } from "../types";
import { toast } from "sonner";
import type { Patient } from "@/features/patient/types/patient.types";
import {
  generateComparativeAnalysis,
  generateMonthlyReport,
  generatePatientPDF,
} from "../helpers";

interface UsePDFGeneratorsProps {
  stats: MedicDashboard | null;
}

export function usePDFGenerators({ stats }: UsePDFGeneratorsProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingMonthly, setIsGeneratingMonthly] = useState(false);
  const [isGeneratingComparative, setIsGeneratingComparative] = useState(false);

  const handleGeneratePatientPDF = async (patient: Patient) => {
    await generatePatientPDF({ patient, setIsGeneratingPDF });
  };

  const handleGenerateMonthly = async () => {
    if (!stats) {
      toast.error("No hay estadísticas disponibles para generar el reporte");
      return;
    }
    await generateMonthlyReport({ stats, setIsGeneratingMonthly });
  };

  const handleGenerateComparative = async () => {
    if (!stats) {
      toast.error("No hay estadísticas disponibles para generar el análisis");
      return;
    }
    await generateComparativeAnalysis({ stats, setIsGeneratingComparative });
  };

  return {
    isGeneratingPDF,
    isGeneratingMonthly,
    isGeneratingComparative,
    handleGeneratePatientPDF,
    handleGenerateMonthly,
    handleGenerateComparative,
  };
}
