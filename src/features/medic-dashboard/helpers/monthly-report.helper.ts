import { jsPDF } from "jspdf";
import type { MedicDashboard } from "../types";

type GenerateMonthlyReportProps = {
  stats: MedicDashboard;
  setIsGeneratingMonthly: (value: boolean) => void;
};

export const generateMonthlyReport = async ({
  stats,
  setIsGeneratingMonthly,
}: GenerateMonthlyReportProps) => {};
