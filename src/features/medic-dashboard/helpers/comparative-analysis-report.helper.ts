import { jsPDF } from "jspdf";
import type { MedicDashboard } from "../types";

type GenerateComparativeAnalysisProps = {
  stats: MedicDashboard;
  setIsGeneratingComparative: (value: boolean) => void;
};

export const generateComparativeAnalysis = async ({
  stats,
  setIsGeneratingComparative,
}: GenerateComparativeAnalysisProps) => {};
