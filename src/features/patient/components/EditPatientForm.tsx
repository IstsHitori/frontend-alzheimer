import type { Patient } from "../types/patient.types";

interface EditPatientFormProps {
  patient: Patient;
  onPatientUpdated: () => void;
  onBack: () => void;
}

export function EditPatientForm({
  patient,
  onPatientUpdated,
  onBack,
}: EditPatientFormProps) {
  return <div>EditPatientForm</div>;
}
