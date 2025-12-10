import type { Patient } from "../types/patient.types";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft } from "lucide-react";
import {
  CognitiveEvaPatient,
  GeneralInfoPatient,
  MedicalInfoPatient,
  PatientAnalysisInfo,
} from "./infoPatient";

interface ShowInfoPatientProps {
  patient: Patient;
  onBack?: () => void;
}

export const ShowInfoPatient = ({ patient, onBack }: ShowInfoPatientProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2 mb-4 text-blue-600 hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Pacientes
            </Button>
          )}

          {/* Patient Header Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/30 rounded-xl">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      {patient.personalInfo.fullName}
                    </h1>
                    <p className="text-sm text-white/80 mt-1">
                      ID: {patient.personalInfo.identification}
                    </p>
                  </div>
                </div>
                <Badge className="bg-white text-blue-600 text-sm py-1 px-3 font-semibold">
                  {patient.personalInfo.gender}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Edad Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-6 border border-blue-200/50 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/20 rounded-full blur-2xl group-hover:blur-3xl transition-all"></div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Edad
              </p>
              <p className="text-4xl font-black text-blue-700 mt-3">
                {patient.personalInfo.age}
              </p>
              <p className="text-xs text-blue-500 mt-2 font-semibold">años</p>
            </div>
          </div>

          {/* Peso Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 via-cyan-100 to-cyan-50 p-6 border border-cyan-200/50 shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-200/20 rounded-full blur-2xl group-hover:blur-3xl transition-all"></div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-cyan-600 uppercase tracking-widest">
                Peso
              </p>
              <p className="text-4xl font-black text-cyan-700 mt-3">
                {patient.physicalData.weight}
              </p>
              <p className="text-xs text-cyan-500 mt-2 font-semibold">kg</p>
            </div>
          </div>

          {/* Altura Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50 p-6 border border-indigo-200/50 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-200/20 rounded-full blur-2xl group-hover:blur-3xl transition-all"></div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                Altura
              </p>
              <p className="text-4xl font-black text-indigo-700 mt-3">
                {patient.physicalData.size}
              </p>
              <p className="text-xs text-indigo-500 mt-2 font-semibold">cm</p>
            </div>
          </div>

          {/* EPS Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50 p-6 border border-sky-200/50 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-sky-200/20 rounded-full blur-2xl group-hover:blur-3xl transition-all"></div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                EPS
              </p>
              <p className="text-lg font-black text-sky-700 mt-3 truncate">
                {patient.eps.entity.substring(0, 20)}
              </p>
              <p className="text-xs text-sky-500 mt-2 font-semibold">Entidad</p>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <div className="bg-white rounded-lg shadow-md p-1 mb-6 border border-blue-200">
            <TabsList className="grid w-full grid-cols-4 gap-2 bg-transparent p-0">
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
                value="analysis"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
              >
                Analysis del paciente
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

          {/* Medical Tab */}
          <TabsContent value="analysis" className="space-y-4">
            <PatientAnalysisInfo patientId={patient.id} />
          </TabsContent>

          {/* Cognitive Evaluation Tab */}
          <TabsContent value="cognitive" className="space-y-4">
            <CognitiveEvaPatient
              cognitiveEvaluation={patient.cognitiveEvaluation}
              patientId={patient.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
