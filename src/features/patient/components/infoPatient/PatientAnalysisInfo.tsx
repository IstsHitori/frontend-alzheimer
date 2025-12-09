import type { Patient } from "../../types";

type PatientAnalysisProps = {
  patientId: Patient["id"];
};
export function PatientAnalysisInfo({ patientId }: PatientAnalysisProps) {
  return <div>PatientAnalysis</div>;
}
