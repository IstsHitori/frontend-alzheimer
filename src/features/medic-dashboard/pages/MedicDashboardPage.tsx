import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AnalyticsTab,
  DashboardHeader,
  OverviewTab,
  PatientsTab,
} from "../components";
import { useMedicalDashboard } from "../hooks";
import {
  useCatalog,
  useGetCatalog,
  usePatientSelection,
} from "@/features/patient/hooks";
import useGetPatients from "@/features/patient/hooks/useGetPatients";
import {
  NewPatientForm,
  EditPatientForm,
  ShowInfoPatient,
} from "@/features/patient/components";

export default function MedicDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const { medicalQuery, medicalStats, setMedicalStats } = useMedicalDashboard();

  const { setEpsList, setConditions, setMedications } = useCatalog();

  const { epsQuery, conditionsQuery, medicationsQuery } = useGetCatalog();

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
    handleCloseEdit,
    handlePatientUpdated,
    handleDeselectPatient,
  } = usePatientSelection();

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

  useEffect(() => {
    if (epsQuery.isSuccess && epsQuery.data) setEpsList(epsQuery.data);
  }, [epsQuery.isSuccess, epsQuery.data, setEpsList]);

  useEffect(() => {
    if (conditionsQuery.isSuccess && conditionsQuery.data)
      setConditions(conditionsQuery.data);
  }, [conditionsQuery.isSuccess, conditionsQuery.data, setConditions]);

  useEffect(() => {
    if (medicationsQuery.isSuccess && medicationsQuery.data)
      setMedications(medicationsQuery.data);
  }, [medicationsQuery.isSuccess, medicationsQuery.data, setMedications]);

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
    return (
      <NewPatientForm
        onPatientCreated={handlePatientCreated}
        onBack={handleCloseNewPatient}
      />
    );
  }

  if (editingPatient) {
    return (
      <EditPatientForm
        patient={editingPatient}
        onPatientUpdated={handlePatientUpdated}
        onBack={handleCloseEdit}
      />
    );
  }

  if (selectedPatient) {
    return (
      <ShowInfoPatient
        patient={selectedPatient}
        onBack={handleDeselectPatient}
      />
    );
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
    <div className="space-y-6 pb-6">
      <DashboardHeader
        title="Dashboard Médico"
        subtitle="Análisis y estadísticas de diagnósticos"
      />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="bg-white border border-gray-200 rounded-lg p-1 inline-flex gap-1">
          <TabsList className="grid grid-cols-4 gap-1 bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="text-xs sm:text-sm rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 transition-colors"
            >
              Resumen
            </TabsTrigger>
            <TabsTrigger
              value="patients"
              className="text-xs sm:text-sm rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 transition-colors"
            >
              Pacientes
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-xs sm:text-sm rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 transition-colors"
            >
              Análisis
            </TabsTrigger>
          </TabsList>
        </div>

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
      </Tabs>
    </div>
  );
}
