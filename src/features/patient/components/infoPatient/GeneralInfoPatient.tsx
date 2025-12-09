import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Patient } from "../../types";
import { Activity, Phone, Stethoscope, User } from "lucide-react";
import { InfoField } from ".";

type GeneralInfoProps = {
  personalInfo: Patient["personalInfo"];
  physicalData: Patient["physicalData"];
  eps: Patient["eps"];
};
export function GeneralInfoPatient({
  personalInfo,
  physicalData,
  eps,
}: GeneralInfoProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Personal Information */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Información Personal</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoField
            label="Fecha de Nacimiento"
            value={new Date(personalInfo.birthDate).toLocaleDateString(
              "es-ES",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          />
          <InfoField
            label="Nivel Educativo"
            value={personalInfo.educationLevel}
          />
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            <CardTitle className="text-lg">Contacto</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoField label="Teléfono" value={personalInfo.telephone} />
        </CardContent>
      </Card>

      {/* Physical Data */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Activity className="h-5 w-5 text-orange-600" />
            </div>
            <CardTitle className="text-lg">Datos Físicos</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoField
            label="Tensión Arterial"
            value={`${physicalData.tension} mmHg`}
          />
        </CardContent>
      </Card>

      {/* EPS Information */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Stethoscope className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle className="text-lg">Información EPS</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoField label="Entidad" value={eps.entity} />
          <InfoField label="Régimen" value={eps.regime} />
          <InfoField label="Código" value={eps.code} />
        </CardContent>
      </Card>
    </div>
  );
}
