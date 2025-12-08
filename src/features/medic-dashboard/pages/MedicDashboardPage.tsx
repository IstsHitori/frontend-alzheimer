import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AnalyticsTab,
  DashboardHeader,
  OverviewTab,
  PatientsTab,
  ReportsTab,
} from "../components";
import { useMedicalDashboard, usePDFGenerators } from "../hooks";
import { usePatientSelection } from "@/features/patient/hooks";
import useGetPatients from "@/features/patient/hooks/useGetPatients";
import { NewPatientForm } from "@/features/patient/components";

export default function MedicDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const { medicalQuery, medicalStats, setMedicalStats } = useMedicalDashboard();
  const { patientsQuery, patients, setPatients } = useGetPatients();

  const {
    selectedPatient,
    editingPatient,
    showNewPatientForm,
    handleSelectPatient,
    handleEditPatient,
    handleAddPatient,
    handlePatientCreated,
    handleCloseNewPatient,
  } = usePatientSelection();

  const {
    isGeneratingMonthly,
    isGeneratingComparative,
    handleGenerateMonthly,
    handleGenerateComparative,
  } = usePDFGenerators({ stats: medicalStats });

  useEffect(() => {
    if (medicalQuery.isSuccess && medicalQuery.data) {
      setMedicalStats(medicalQuery.data);
    }
  }, [medicalQuery.isSuccess, medicalQuery.data, setMedicalStats]);

  useEffect(() => {
    if (patientsQuery.isSuccess && patientsQuery.data) {
      setPatients(patientsQuery.data);
    }
  }, [patientsQuery.isSuccess, patientsQuery.data, setPatients]);

  if (medicalQuery.isLoading || patientsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (medicalQuery.isError || patientsQuery.isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive mb-2">Error al cargar el dashboard</p>
          <p className="text-sm text-muted-foreground">
            Por favor, intente nuevamente más tarde
          </p>
        </div>
      </div>
    );
  }

  if (showNewPatientForm) {
    return <NewPatientForm
      onPatientCreated={handlePatientCreated}
      onBack={handleCloseNewPatient}
    />;
  }

  if (editingPatient) {
    //Show
  }

  if (selectedPatient) {
    //Show
  }

  if (!medicalStats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            Cargando estadísticas...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DashboardHeader
        title="Dashboard Médico"
        subtitle="Análisis y estadísticas de diagnósticos"
      />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            Resumen
          </TabsTrigger>
          <TabsTrigger value="patients" className="text-xs sm:text-sm">
            Pacientes
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs sm:text-sm">
            Análisis
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-xs sm:text-sm">
            Reportes
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab - Liskov Substitution Principle */}
        <TabsContent value="overview">
          <OverviewTab stats={medicalStats} />
        </TabsContent>

        {/* Patients Tab - Liskov Substitution Principle */}
        <TabsContent value="patients">
          <PatientsTab
            patients={patients}
            onPatientSelect={handleSelectPatient}
            onAddPatient={handleAddPatient}
            onEditPatient={handleEditPatient}
          />
        </TabsContent>

        {/* Analytics Tab - Liskov Substitution Principle */}
        <TabsContent value="analytics">
          <AnalyticsTab stats={medicalStats} />
        </TabsContent>

        {/* Reports Tab - Liskov Substitution Principle */}
        <TabsContent value="reports">
          <ReportsTab
            onGenerateMonthly={handleGenerateMonthly}
            onGenerateComparative={handleGenerateComparative}
            isGeneratingMonthly={isGeneratingMonthly}
            isGeneratingComparative={isGeneratingComparative}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
