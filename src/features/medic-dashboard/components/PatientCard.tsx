import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Phone, FileText, Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Patient } from "@/features/patient/types/patient.types";
import useDeletePatient from "@/features/patient/hooks/useDeletePatient";
import { useState } from "react";

interface PatientCardProps {
  patient: Patient;
  onPatientSelect: (patient: Patient) => void;
  onEditPatient: (patient: Patient) => void;
}

export function PatientCard({
  patient,
  onPatientSelect,
  onEditPatient,
}: PatientCardProps) {
  const { mutate: deletePatient } = useDeletePatient();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    deletePatient(patient.id, {
      onSettled: () => {
        setIsDeleting(false);
      },
    });
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getGenderBadgeColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "masculino":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "femenino":
        return "bg-pink-100 text-pink-700 hover:bg-pink-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <Card
      className="hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white overflow-hidden"
      onClick={() => onPatientSelect(patient)}
    >
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left Section - Patient Info */}
          <div className="flex items-center gap-3 flex-1">
            {/* Avatar */}
            <div className="h-10 w-10 rounded-lg bg-linear-to-br from-primary/20 to-blue-100 flex items-center justify-center shrink-0 border border-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>

            {/* Patient Details */}
            <div className="flex-1 min-w-0">
              {/* Name and ID */}
              <div>
                <h3 className="font-bold text-sm text-gray-900 leading-tight">
                  {patient.personalInfo.fullName}
                </h3>
                <p className="text-xs text-gray-500">
                  {patient.personalInfo.identification}
                </p>
              </div>

              {/* Quick Info Row */}
              <div className="flex flex-wrap gap-3 text-xs mt-1.5">
                <div>
                  <span className="text-gray-500">Edad</span>
                  <p className="font-semibold text-gray-900">{patient.personalInfo.age}</p>
                </div>
                <div>
                  <span className="text-gray-500">Teléfono</span>
                  <p className="font-semibold text-gray-900">{patient.personalInfo.telephone}</p>
                </div>
                <div>
                  <span className="text-gray-500">Nacimiento</span>
                  <p className="font-semibold text-gray-900">
                    {formatDate(patient.personalInfo.birthDate)}
                  </p>
                </div>
              </div>

              {/* EPS and Gender Badges */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge className="bg-gray-900 text-white text-xs font-medium hover:bg-gray-900">
                  {patient.eps.entity}
                </Badge>
                <Badge
                  className={`text-xs font-medium ${getGenderBadgeColor(
                    patient.personalInfo.gender
                  )}`}
                >
                  {patient.personalInfo.gender}
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEditPatient(patient);
              }}
              className="flex items-center gap-1 flex-1 sm:flex-none border-gray-200 hover:bg-gray-50 text-gray-700 h-8 px-2.5 text-xs"
              disabled={isDeleting}
            >
              <Edit className="h-3.5 w-3.5" />
              Editar
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 flex-1 sm:flex-none border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 h-8 px-2.5 text-xs"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Eliminar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Está seguro de eliminar este paciente?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Al eliminar al paciente <strong>{patient.personalInfo.fullName}</strong>, se eliminará toda la información asociada incluyendo:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Datos personales y de contacto</li>
                      <li>Información médica y condiciones</li>
                      <li>Medicamentos actuales</li>
                      <li>Antecedentes familiares</li>
                      <li>Evaluaciones cognitivas</li>
                    </ul>
                    <p className="mt-3 font-semibold text-destructive">
                      Esta acción no se puede deshacer.
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                    disabled={isDeleting}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {isDeleting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Eliminando...
                      </>
                    ) : (
                      "Sí, eliminar paciente"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onPatientSelect(patient);
              }}
              className="flex items-center gap-1 flex-1 sm:flex-none bg-primary hover:bg-primary/90 h-8 px-2.5 text-xs font-medium"
              disabled={isDeleting}
            >
              Ver Detalles
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
