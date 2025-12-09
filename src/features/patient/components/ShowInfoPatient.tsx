import type { Patient } from "../types/patient.types";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft } from "lucide-react";
import { GeneralInfoPatient, MedicalInfoPatient } from "./infoPatient";
import CognitiveEvaPatient from "./infoPatient/CognitiveEvaPatient";

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
            <GeneralInfoPatient
              personalInfo={patient.personalInfo}
              physicalData={patient.physicalData}
              eps={patient.eps}
            />
          </TabsContent>

          {/* Medical Tab */}
          <TabsContent value="medical" className="space-y-4">
            <MedicalInfoPatient
              currentConditions={patient.currentConditions}
              currentMedications={patient.currentMedications}
              familyBackgrounds={patient.familyBackgrounds}
              symptoms={patient.symptoms}
            />
          </TabsContent>

          {/* Cognitive Evaluation Tab */}
          <TabsContent value="cognitive" className="space-y-4">
            <CognitiveEvaPatient
              cognitiveEvaluation={patient.cognitiveEvaluation}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
