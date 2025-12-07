import { analysisApi } from "@/api/analysis-api";
import type { PatientAnalysis } from "@/features/analysis/types";
import type { Patient } from "@/features/patient/types/patient.types";
import { jsPDF } from "jspdf";

type GeneratePatientPDFProps = {
  patient: Patient;
  setIsGeneratingPDF: (value: boolean) => void;
};

/**
 * Helper functions for PDF generation
 */
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDiagnosis = (diagnosis: string): string => {
  return diagnosis
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getRiskLevelColor = (riskLevel: string): [number, number, number] => {
  const level = riskLevel.toLowerCase();
  if (level === "bajo" || level === "low") return [34, 197, 94]; // green
  if (level === "medio" || level === "medium") return [234, 179, 8]; // yellow
  if (level === "alto" || level === "high") return [239, 68, 68]; // red
  return [128, 128, 128]; // gray
};

/**
 * Add page header
 */
const addPageHeader = (
  doc: jsPDF,
  title: string,
  primaryColor: readonly [number, number, number]
) => {
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 20, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text(title, 20, 13);
};

/**
 * Add page footer
 */
const addPageFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(
    `Generado: ${new Date().toLocaleDateString(
      "es-ES"
    )} ${new Date().toLocaleTimeString("es-ES")}`,
    20,
    285
  );
  doc.text("Plataforma de Análisis de Alzheimer v1.0", 20, 290);
  doc.text(`Página ${pageNumber} de ${totalPages}`, 170, 290);
};

/**
 * Check if need new page
 */
const checkNewPage = (
  doc: jsPDF,
  currentY: number,
  spaceNeeded: number = 30
): number => {
  if (currentY + spaceNeeded > 270) {
    doc.addPage();
    return 30;
  }
  return currentY;
};

/**
 * Add section title
 */
const addSectionTitle = (
  doc: jsPDF,
  title: string,
  yPos: number,
  primaryColor: readonly [number, number, number]
): number => {
  doc.setFillColor(...primaryColor);
  doc.rect(15, yPos - 5, 180, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(title, 20, yPos + 2);
  doc.setFont("helvetica", "normal");
  return yPos + 12;
};

/**
 * Add subsection title
 */
const addSubsectionTitle = (
  doc: jsPDF,
  title: string,
  yPos: number,
  textColor: readonly [number, number, number]
): number => {
  doc.setTextColor(...textColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(title, 20, yPos);
  doc.setFont("helvetica", "normal");
  return yPos + 8;
};

export const generatePatientPDF = async ({
  patient,
  setIsGeneratingPDF,
}: GeneratePatientPDFProps) => {
  setIsGeneratingPDF(true);

  try {
    // Fetch patient analyses
    const analyses: PatientAnalysis[] = await analysisApi.getAnalysisByPatientId(patient.id);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  } finally {
    setIsGeneratingPDF(false);
  }
};
