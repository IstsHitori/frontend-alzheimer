import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Phone, FileText, Edit } from "lucide-react";
import type { Patient } from "@/features/patient/types/patient.types";

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
      className="hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-primary"
      onClick={() => onPatientSelect(patient)}
    >
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Left Section - Patient Info */}
          <div className="flex items-start gap-3 flex-1">
            {/* Avatar */}
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="h-6 w-6 text-primary" />
            </div>

            {/* Patient Details */}
            <div className="flex-1 min-w-0">
              {/* Name and ID */}
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-semibold text-base truncate">
                  {patient.personalInfo.fullName}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {patient.personalInfo.identification}
                </Badge>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                {/* Age and Gender */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{patient.personalInfo.age} años</span>
                  <Badge
                    className={`text-xs ${getGenderBadgeColor(
                      patient.personalInfo.gender
                    )}`}
                  >
                    {patient.personalInfo.gender}
                  </Badge>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{patient.personalInfo.telephone}</span>
                </div>

                {/* Birth Date */}
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5" />
                  <span>
                    Nacimiento: {formatDate(patient.personalInfo.birthDate)}
                  </span>
                </div>

                {/* Education Level */}
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5" />
                  <span className="capitalize">
                    {patient.personalInfo.educationLevel}
                  </span>
                </div>
              </div>

              {/* EPS Info */}
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  {patient.eps.entity}
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
              className="flex items-center gap-1 flex-1 sm:flex-none"
            >
              <Edit className="h-3.5 w-3.5" />
              <span className="text-xs">Editar</span>
            </Button>

            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onPatientSelect(patient);
              }}
              className="flex items-center gap-1 flex-1 sm:flex-none"
            >
              <span className="text-xs">Ver Detalles</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
