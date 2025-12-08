import { useEffect } from "react";
import type { Patient } from "../types/patient.types";
import { EditPatientForm } from ".";

interface EditPatientModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onPatientUpdated?: () => void;
}

export function EditPatientModal({
  patient,
  isOpen,
  onClose,
  onPatientUpdated,
}: EditPatientModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !patient) return null;

  const handlePatientUpdated = () => {
    onClose();
    if (onPatientUpdated) {
      onPatientUpdated();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
      onClick={(e) => {
        // Close modal when clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="bg-background rounded-lg max-w-5xl w-full my-8 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <EditPatientForm
            patient={patient}
            onPatientUpdated={handlePatientUpdated}
            onBack={onClose}
          />
        </div>
      </div>
    </div>
  );
}
