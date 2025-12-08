import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useCatalog, useCreatePatient, useCreatePatientForm } from "../hooks";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectSeparator,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { CreatePatient } from "../types";
import { EDUCATION_LEVEL, PATIENT_GENDER } from "../schemas";
import { SearchableMultiSelect } from "./SearchableMultiSelect";
import { useState, useCallback } from "react";
import { catalogApi } from "@/api";
import type { Condition, Medication } from "../types";

interface NewPatientFormProps {
  onPatientCreated: () => void;
  onBack: () => void;
}
export function NewPatientForm({
  onBack,
}: NewPatientFormProps) {
  const { isCreating, setIscreating } = useCreatePatient();
  const { control, handleSubmit } = useCreatePatientForm();
  const { epsList, conditions, medications } = useCatalog();

  // State for search results
  const [conditionSearchResults, setConditionSearchResults] = useState<Condition[]>([]);
  const [medicationSearchResults, setMedicationSearchResults] = useState<Medication[]>([]);

  // Search handlers with useCallback to prevent infinite loops
  const handleConditionSearch = useCallback(async (searchTerm: string) => {
    
    if (searchTerm.trim()) {
      const results = await catalogApi.getConditionsBySearch(searchTerm);
      setConditionSearchResults(results);
    } else {
      setConditionSearchResults(conditions.slice(0, 50));
    }
  }, [conditions]);

  const handleMedicationSearch = useCallback(async (searchTerm: string) => {
    if (searchTerm.trim()) {
      const results = await catalogApi.getMedicationsBySearch(searchTerm);
      setMedicationSearchResults(results);
    } else {
      setMedicationSearchResults(medications.slice(0, 50));
    }
  }, [medications]);

  const onSubmit: SubmitHandler<CreatePatient> = async (newPatient) => {
    setIscreating(true);
    console.log("Paciente creado:", newPatient)
    setIscreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} disabled={isCreating}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Nuevo Paciente</h2>
          <p className="text-muted-foreground">
            Complete la información del paciente para su registro en el sistema
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
          <FieldGroup className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="fullName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="fullName">Nombre completo</FieldLabel>
                  <Input
                    {...field}
                    id="fullName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Daniel Rojas"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="identification"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="identification">
                    Identificación
                  </FieldLabel>
                  <Input
                    {...field}
                    id="identification"
                    placeholder="1234567890"
                    type="number"
                    min={0}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="birthDate"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="birthDate">
                    Fecha de nacimiento
                  </FieldLabel>
                  <Input {...field} id="birthDate" type="date" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="gender"
              render={({ field, fieldState }) => (
                <Field
                  orientation={"vertical"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="gender">Género</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="gender"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectGroup>
                        <SelectLabel className="text-center">
                          Generos
                        </SelectLabel>
                        <SelectSeparator />
                        <SelectItem value={PATIENT_GENDER.MALE}>
                          Masculino
                        </SelectItem>
                        <SelectItem value={PATIENT_GENDER.FEMALE}>
                          Femenino
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="telephone"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="telephone">Teléfono</FieldLabel>
                  <Input
                    {...field}
                    id="telephone"
                    placeholder="3001234567"
                    type="number"
                    min={0}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="educationLevel"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="educationLevel">
                    Nivel educativo
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="educationLevel"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Selecciona un nivel de educación" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectGroup>
                        <SelectLabel className="text-center">
                          Nivel de eduación
                        </SelectLabel>
                        <SelectSeparator />
                        <SelectItem value={EDUCATION_LEVEL.PRIMARY}>
                          Primaria
                        </SelectItem>
                        <SelectItem value={EDUCATION_LEVEL.SECONDARY}>
                          Secundaria
                        </SelectItem>
                        <SelectItem value={EDUCATION_LEVEL.COLLEGE}>
                          Universidad
                        </SelectItem>
                        <SelectItem value={EDUCATION_LEVEL.POSTGRADUATE}>
                          Postgrado
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        {/* Health Metrics */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Métricas de Salud</h3>
          <FieldGroup className="grid grid-cols-3 gap-4">
            <Controller
              control={control}
              name="weight"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="weight">Peso (kg)</FieldLabel>
                  <Input
                    {...field}
                    id="weight"
                    type="number"
                    placeholder="70"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="size"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="size">Altura (cm)</FieldLabel>
                  <Input
                    {...field}
                    id="size"
                    type="number"
                    min={0}
                    placeholder="175"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="tension"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tension">Tensión arterial</FieldLabel>
                  <Input
                    {...field}
                    id="tension"
                    type="number"
                    placeholder="120"
                    min={0}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        {/* Medical Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Información Médica</h3>
          <FieldGroup className="space-y-4">
            <Controller
              control={control}
              name="eps"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="eps">EPS</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="eps"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Selecciona una eps" />
                    </SelectTrigger>

                    <SelectContent position="item-aligned" className="max-h-[300px]">
                      <SelectGroup>
                        <SelectLabel className="text-center">
                          Regimen subsidiado
                        </SelectLabel>
                        <SelectSeparator />
                        {epsList
                          .filter((eps) => eps.regime.toLowerCase() === "subsidiado")
                          .map((eps) => (
                            <SelectItem key={eps.id} value={eps.id.toString()}>
                              {eps.entity}
                            </SelectItem>
                          ))}
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel className="text-center">
                          Regimen contributivo
                        </SelectLabel>
                        <SelectSeparator />
                        {epsList
                          .filter((eps) => eps.regime.toLowerCase() === "contributivo")
                          .map((eps) => (
                            <SelectItem key={eps.id} value={eps.id.toString()}>
                              {eps.entity}
                            </SelectItem>
                          ))}
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel className="text-center">
                          Ambos regimenes
                        </SelectLabel>
                        <SelectSeparator />
                        {epsList
                          .filter((eps) => eps.regime.toLowerCase() === "ambos regimenes")
                          .map((eps) => (
                            <SelectItem key={eps.id} value={eps.id.toString()}>
                              {eps.entity}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Medical Conditions */}
            <Controller
              control={control}
              name="conditions"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <SearchableMultiSelect<Condition>
                    label="Condiciones Médicas"
                    placeholder="Buscar condición por nombre o código..."
                    selectedItems={field.value || []}
                    onItemsChange={field.onChange}
                    availableItems={conditionSearchResults.length > 0 ? conditionSearchResults : conditions.slice(0, 50)}
                    onSearch={handleConditionSearch}
                    getItemId={(item) => item.id}
                    getItemLabel={(item) => item.name}
                    getItemSecondary={(item) => `Código: ${item.code}`}
                    disabled={isCreating}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Current Medications */}
            <Controller
              control={control}
              name="currentMedications"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <SearchableMultiSelect<Medication>
                    label="Medicamentos Actuales"
                    placeholder="Buscar medicamento por producto o expediente..."
                    selectedItems={field.value || []}
                    onItemsChange={field.onChange}
                    availableItems={medicationSearchResults.length > 0 ? medicationSearchResults : medications.slice(0, 50)}
                    onSearch={handleMedicationSearch}
                    getItemId={(item) => item.id}
                    getItemLabel={(item) => item.product}
                    getItemSecondary={(item) => `Expediente: ${item.expedient}`}
                    disabled={isCreating}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Family Background */}
            <Controller
              control={control}
              name="familyBackground"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <SearchableMultiSelect<Condition>
                    label="Antecedentes Familiares"
                    placeholder="Buscar antecedente por nombre o código..."
                    selectedItems={field.value || []}
                    onItemsChange={field.onChange}
                    availableItems={conditionSearchResults.length > 0 ? conditionSearchResults : conditions.slice(0, 50)}
                    onSearch={handleConditionSearch}
                    getItemId={(item) => item.id}
                    getItemLabel={(item) => item.name}
                    getItemSecondary={(item) => `Código: ${item.code}`}
                    disabled={isCreating}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        {/* Current Symptoms */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Síntomas Actuales</h3>
          <FieldGroup className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="symptomsPresent.memoryLoss"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="memoryLoss"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isCreating}
                  />
                  <label
                    htmlFor="memoryLoss"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pérdida de memoria
                  </label>
                </div>
              )}
            />

            <Controller
              control={control}
              name="symptomsPresent.lenguageProblems"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lenguageProblems"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isCreating}
                  />
                  <label
                    htmlFor="lenguageProblems"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Problemas de lenguaje
                  </label>
                </div>
              )}
            />

            <Controller
              control={control}
              name="symptomsPresent.difficultyWithTasks"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="difficultyWithTasks"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isCreating}
                  />
                  <label
                    htmlFor="difficultyWithTasks"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Dificultad con tareas
                  </label>
                </div>
              )}
            />

            <Controller
              control={control}
              name="symptomsPresent.disorientation"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="disorientation"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isCreating}
                  />
                  <label
                    htmlFor="disorientation"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Desorientación
                  </label>
                </div>
              )}
            />

            <Controller
              control={control}
              name="symptomsPresent.personalityChanges"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="personalityChanges"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isCreating}
                  />
                  <label
                    htmlFor="personalityChanges"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cambios de personalidad
                  </label>
                </div>
              )}
            />

            <Controller
              control={control}
              name="symptomsPresent.temporalConfusion"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="temporalConfusion"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isCreating}
                  />
                  <label
                    htmlFor="temporalConfusion"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Confusión temporal/espacial
                  </label>
                </div>
              )}
            />
          </FieldGroup>
        </div>

        <Button type="submit" disabled={isCreating} className="w-full">
          {isCreating ? "Creando..." : "Crear Paciente"}
        </Button>
      </form>
    </div>
  );
}
