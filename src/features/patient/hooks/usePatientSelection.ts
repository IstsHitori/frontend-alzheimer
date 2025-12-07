import { useState } from "react";
import type { Patient } from "../types/patient.types";

export function usePatientSelection() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleDeselectPatient = () => {
    setSelectedPatient(null);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
  };

  const handleCloseEdit = () => {
    setEditingPatient(null);
  };

  const handleAddPatient = () => {
    setShowNewPatientForm(true);
  };

  const handleCloseNewPatient = () => {
    setShowNewPatientForm(false);
  };

  const handlePatientCreated = () => {
    setShowNewPatientForm(false);
  };

  const handlePatientUpdated = (patient: Patient) => {
    console.log("[MedicDashboard] Paciente actualizado:", patient);
    setEditingPatient(null);
    if (selectedPatient && selectedPatient.id === patient.id) {
      setSelectedPatient(patient);
    }
  };

  return {
    selectedPatient,
    editingPatient,
    showNewPatientForm,
    handleSelectPatient,
    handleDeselectPatient,
    handleEditPatient,
    handleCloseEdit,
    handleAddPatient,
    handleCloseNewPatient,
    handlePatientCreated,
    handlePatientUpdated,
  };
}
