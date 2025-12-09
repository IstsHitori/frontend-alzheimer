import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, Pill, Heart } from "lucide-react";
import type { Patient } from "../../types";
type MedicalInfoPatientProps = {
  currentConditions: Patient["currentConditions"];
  currentMedications: Patient["currentMedications"];
  familyBackgrounds: Patient["familyBackgrounds"];
  symptoms: Patient["symptoms"];
};
export function MedicalInfoPatient({
  currentConditions,
  currentMedications,
  familyBackgrounds,
  symptoms,
}: MedicalInfoPatientProps) {
  return (
    <>
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
          {currentConditions.length > 0 ? (
            <div className="space-y-2">
              {currentConditions.map((condition) => (
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
          {currentMedications.length > 0 ? (
            <div className="space-y-2">
              {currentMedications.map((med) => (
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
          {familyBackgrounds.length > 0 ? (
            <div className="space-y-2">
              {familyBackgrounds.map((bg) => (
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
                  symptoms.memoryLoss ? "bg-red-500" : "bg-gray-300"
                }`}
              />
              <span className="text-sm">Pérdida de Memoria</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  symptoms.lenguageProblems ? "bg-red-500" : "bg-gray-300"
                }`}
              />
              <span className="text-sm">Problemas de Lenguaje</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  symptoms.difficultyWithTasks ? "bg-red-500" : "bg-gray-300"
                }`}
              />
              <span className="text-sm">Dificultad con Tareas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  symptoms.disorientation ? "bg-red-500" : "bg-gray-300"
                }`}
              />
              <span className="text-sm">Desorientación</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  symptoms.personalityChanges ? "bg-red-500" : "bg-gray-300"
                }`}
              />
              <span className="text-sm">Cambios de Personalidad</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  symptoms.temporalConfusion ? "bg-red-500" : "bg-gray-300"
                }`}
              />
              <span className="text-sm">Confusión Temporal</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
