import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Patient } from "@/features/patient/types/patient.types";
import { Search, Filter, UserPlus, X } from "lucide-react";
import { PatientCard } from ".";
import { useState, useMemo } from "react";

interface PatientsTabProps {
  patients: Patient[];
  onPatientSelect: (patient: Patient) => void;
  onAddPatient: () => void;
  onEditPatient: (patient: Patient) => void;
}

export function PatientsTab({
  patients,
  onPatientSelect,
  onAddPatient,
  onEditPatient,
}: PatientsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");

  // Filtrar pacientes por búsqueda y género
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      // Filtro por búsqueda (nombre o identificación)
      const matchesSearch =
        searchTerm === "" ||
        patient.personalInfo.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        patient.personalInfo.identification.includes(searchTerm);

      // Filtro por género
      const matchesGender =
        genderFilter === "all" ||
        patient.personalInfo.gender === genderFilter;

      return matchesSearch && matchesGender;
    });
  }, [patients, searchTerm, genderFilter]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setGenderFilter("all");
  };

  const hasActiveFilters = searchTerm !== "" || genderFilter !== "all";

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar por nombre o cédula..."
              className="pl-10 pr-10 text-sm border-gray-200 focus:border-primary focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Select value={genderFilter} onValueChange={setGenderFilter}>
            <SelectTrigger className="w-full sm:w-48 text-sm border-gray-200 focus:border-primary focus:ring-primary">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por género" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los géneros</SelectItem>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="femenino">Femenino</SelectItem>
            </SelectContent>
          </Select>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex items-center gap-2 text-sm border-gray-200 hover:bg-gray-100"
              size="sm"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Limpiar</span>
            </Button>
          )}
          <Button
            onClick={onAddPatient}
            className="flex items-center gap-2 text-sm bg-primary hover:bg-primary/90"
            size="sm"
          >
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Agregar</span>
          </Button>
        </div>

        {/* Results Count */}
        {hasActiveFilters && (
          <div className="text-sm text-gray-600 pt-2 border-t border-gray-200">
            {filteredPatients.length === 0 ? (
              <p>No se encontraron pacientes con los filtros aplicados</p>
            ) : (
              <p>
                Mostrando {filteredPatients.length} de {patients.length}{" "}
                paciente{patients.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Patient Cards */}
      <div className="grid gap-3">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEditPatient={onEditPatient}
              onPatientSelect={onPatientSelect}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <p className="text-gray-600 text-sm">
              {hasActiveFilters
                ? "No se encontraron pacientes"
                : "No hay pacientes registrados"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
