import type { Patient } from "../types/patient.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface ShowInfoPatientProps {
  patient: Patient;
  onBack?: () => void;
}

export const ShowInfoPatient = ({ patient, onBack }: ShowInfoPatientProps) => {
  return (
    <div className="w-full space-y-4 p-4">
      {onBack && (
        <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a Pacientes
        </Button>
      )}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="medical">Médico</TabsTrigger>
          <TabsTrigger value="cognitive">Cognitivo</TabsTrigger>
        </TabsList>

        {/* General Information Tab */}
        <TabsContent value="general" className="space-y-4">
          {/* Personal Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Información Personal</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="text-primary" size={20} />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nombre Completo</p>
                  <p className="font-semibold">
                    {patient.personalInfo.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Identificación</p>
                  <p className="font-semibold">
                    {patient.personalInfo.identification}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Edad</p>
                  <p className="font-semibold">
                    {patient.personalInfo.age} años
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Género</p>
                  <p className="font-semibold capitalize">
                    {patient.personalInfo.gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha de Nacimiento</p>
                  <p className="font-semibold">
                    {new Date(
                      patient.personalInfo.birthDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nivel Educativo</p>
                  <p className="font-semibold capitalize">
                    {patient.personalInfo.educationLevel}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Información de Contacto</CardTitle>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Phone className="text-blue-600" size={20} />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-semibold">
                    {patient.personalInfo.telephone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Physical Data Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Datos Físicos</CardTitle>
              <div className="p-2 bg-green-50 rounded-lg">
                <Activity className="text-green-600" size={20} />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Peso</p>
                  <p className="font-semibold">
                    {patient.physicalData.weight} kg
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Altura</p>
                  <p className="font-semibold">
                    {patient.physicalData.size} cm
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tensión</p>
                  <p className="font-semibold">
                    {patient.physicalData.tension} mmHg
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EPS Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Información EPS</CardTitle>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Stethoscope className="text-purple-600" size={20} />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Entidad</p>
                  <p className="font-semibold">{patient.eps.entity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Régimen</p>
                  <p className="font-semibold">{patient.eps.regime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Código</p>
                  <p className="font-semibold">{patient.eps.code}</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                      <p className="font-semibold text-sm">{condition.name}</p>
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
                      <p className="text-xs text-gray-500">{med.laboratory}</p>
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
              <CardTitle className="text-lg">Antecedentes Familiares</CardTitle>
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
                      <p className="text-xs text-gray-600">{bg.description}</p>
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
                      patient.symptoms.memoryLoss ? "bg-red-500" : "bg-gray-300"
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
  );
};
