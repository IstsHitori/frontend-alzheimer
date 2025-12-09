import type { Patient } from "../types/patient.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Heart,
  Pill,
  Phone,
  User,
  Activity,
  Brain,
  Stethoscope,
  ArrowLeft,
} from "lucide-react";

const InfoField = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="pb-3 border-b border-gray-100 last:border-0">
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </p>
    <p className="text-sm font-semibold text-gray-900 mt-1">{value}</p>
  </div>
);

interface ShowInfoPatientProps {
  patient: Patient;
  onBack?: () => void;
}

export const ShowInfoPatient = ({ patient, onBack }: ShowInfoPatientProps) => {
  const getGenderBadge = (gender: string) => {
    return gender.toLowerCase() === "femenino"
      ? "bg-pink-100 text-pink-700"
      : "bg-blue-100 text-blue-700";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="gap-2 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Pacientes
            </Button>
          )}

          {/* Patient Header Card */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {patient.personalInfo.fullName}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      ID: {patient.personalInfo.identification}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${getGenderBadge(
                    patient.personalInfo.gender
                  )} text-sm py-1 px-3`}
                >
                  {patient.personalInfo.gender}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Edad
              </p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {patient.personalInfo.age}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Peso
              </p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {patient.physicalData.weight} kg
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Altura
              </p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {patient.physicalData.size} cm
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                EPS
              </p>
              <p className="text-lg font-bold text-orange-600 mt-2 truncate">
                {patient.eps.entity.substring(0, 12)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <div className="bg-white rounded-lg shadow-md p-1 mb-6 border-0">
            <TabsList className="grid w-full grid-cols-3 gap-2 bg-transparent p-0">
              <TabsTrigger
                value="general"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
              >
                Información General
              </TabsTrigger>
              <TabsTrigger
                value="medical"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
              >
                Información Médica
              </TabsTrigger>
              <TabsTrigger
                value="cognitive"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
              >
                Evaluación Cognitiva
              </TabsTrigger>
            </TabsList>
          </div>

          {/* General Information Tab */}
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Personal Information */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">
                      Información Personal
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <InfoField
                    label="Fecha de Nacimiento"
                    value={new Date(
                      patient.personalInfo.birthDate
                    ).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  />
                  <InfoField
                    label="Nivel Educativo"
                    value={patient.personalInfo.educationLevel}
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
                  <InfoField
                    label="Teléfono"
                    value={patient.personalInfo.telephone}
                  />
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
                    value={`${patient.physicalData.tension} mmHg`}
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
                  <InfoField label="Entidad" value={patient.eps.entity} />
                  <InfoField label="Régimen" value={patient.eps.regime} />
                  <InfoField label="Código" value={patient.eps.code} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Medical Tab */}
          <TabsContent value="medical" className="space-y-4">
            {/* Current Conditions Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">
                  Condiciones Médicas Actuales
                </CardTitle>
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertCircle className="text-red-600" size={20} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {patient.currentConditions.length > 0 ? (
                  <div className="space-y-2">
                    {patient.currentConditions.map((condition) => (
                      <div
                        key={condition.id}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <p className="font-semibold text-sm">
                          {condition.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {condition.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No hay condiciones reportadas
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Current Medications Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">Medicamentos Actuales</CardTitle>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Pill className="text-blue-600" size={20} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {patient.currentMedications.length > 0 ? (
                  <div className="space-y-2">
                    {patient.currentMedications.map((med) => (
                      <div
                        key={med.id}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <p className="font-semibold text-sm">{med.product}</p>
                        <p className="text-xs text-gray-600">
                          {med.pharmaceuticalForm} - {med.administrationRoute}
                        </p>
                        <p className="text-xs text-gray-500">
                          {med.laboratory}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No hay medicamentos reportados
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Family History Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">
                  Antecedentes Familiares
                </CardTitle>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Heart className="text-orange-600" size={20} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {patient.familyBackgrounds.length > 0 ? (
                  <div className="space-y-2">
                    {patient.familyBackgrounds.map((bg) => (
                      <div
                        key={bg.id}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <p className="font-semibold text-sm">{bg.name}</p>
                        <p className="text-xs text-gray-600">
                          {bg.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No hay antecedentes familiares reportados
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Symptoms Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">Síntomas Reportados</CardTitle>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <AlertCircle className="text-yellow-600" size={20} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        patient.symptoms.memoryLoss
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm">Pérdida de Memoria</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        patient.symptoms.lenguageProblems
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm">Problemas de Lenguaje</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        patient.symptoms.difficultyWithTasks
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm">Dificultad con Tareas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        patient.symptoms.disorientation
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm">Desorientación</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        patient.symptoms.personalityChanges
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm">Cambios de Personalidad</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        patient.symptoms.temporalConfusion
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm">Confusión Temporal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cognitive Evaluation Tab */}
          <TabsContent value="cognitive" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">Evaluación Cognitiva</CardTitle>
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Brain className="text-indigo-600" size={20} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-gray-600">MMSE</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      {patient.cognitiveEvaluation.mmse}/30
                    </p>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-gray-600">MoCA</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      {patient.cognitiveEvaluation.moca}/30
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Última Actualización</p>
                  <p className="font-semibold">
                    {new Date(
                      patient.cognitiveEvaluation.updatedAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
