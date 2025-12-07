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
import { Search, Filter, UserPlus } from "lucide-react";
import { PatientCard } from ".";

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
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar pacientes..." className="pl-10 text-sm" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-48 text-sm">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="bajo">Bajo</SelectItem>
            <SelectItem value="medio">Medio</SelectItem>
            <SelectItem value="alto">Alto</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={onAddPatient}
          className="flex items-center gap-2 text-sm"
          size="sm"
        >
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Agregar</span>
        </Button>
      </div>

      {/* Patient Cards */}
      <div className="grid gap-3">
        {patients.length > 0 &&
          patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEditPatient={onEditPatient}
              onPatientSelect={onPatientSelect}
            />
          ))}
      </div>
    </div>
  );
}
