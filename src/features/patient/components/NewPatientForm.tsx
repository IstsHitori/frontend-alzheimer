import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useCreatePatient, useCreatePatientForm } from "../hooks";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { CreatePatient } from "../types/patient.types";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent, SelectSeparator } from "@radix-ui/react-select";
import { PATIENT_GENDER } from "../schemas";

interface NewPatientFormProps {
  onPatientCreated: () => void;
  onBack: () => void;
}
export function NewPatientForm({
  onPatientCreated,
  onBack,
}: NewPatientFormProps) {
  const { isCreating } = useCreatePatient();
  const { control, handleSubmit, reset } = useCreatePatientForm();

  const onSubmit: SubmitHandler<CreatePatient> = async (newPatient) => {};
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
                  orientation={"responsive"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="gender">Género</FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Selecciona un género</SelectItem>
                      <SelectSeparator />
                      <SelectItem value={PATIENT_GENDER.MALE}>
                        Masculino
                      </SelectItem>
                      <SelectItem value={PATIENT_GENDER.FEMALE}>
                        Femenino
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              control={control}
              name="telephone"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="telephone">Teléfono</FieldLabel>
                  <Input {...field} id="telephone" placeholder="3001234567" />
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
                  <Input {...field} id="size" type="number" placeholder="175" />
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
          <FieldGroup className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="educationLevel"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="educationLevel">
                    Nivel educativo
                  </FieldLabel>
                  <Input
                    {...field}
                    id="educationLevel"
                    placeholder="Primaria"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="eps"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="eps">EPS</FieldLabel>
                  <Input {...field} id="eps" type="number" placeholder="1" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
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
