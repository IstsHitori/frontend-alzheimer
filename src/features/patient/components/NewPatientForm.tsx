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
import type { CreatePatient } from "../types/patient.types";
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
import { EDUCATION_LEVEL, PATIENT_GENDER } from "../schemas";

interface NewPatientFormProps {
  onPatientCreated: () => void;
  onBack: () => void;
}
export function NewPatientForm({
  onPatientCreated,
  onBack,
}: NewPatientFormProps) {
  const { isCreating, setIscreating } = useCreatePatient();
  const { control, handleSubmit, reset } = useCreatePatientForm();
  const { epsList } = useCatalog();

  const onSubmit: SubmitHandler<CreatePatient> = async (newPatient) => {
    setIscreating(true);
    console.log(newPatient);
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
          <FieldGroup className="grid grid-cols-2 gap-4">
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

                    <SelectContent position="item-aligned">
                      <SelectGroup>
                        <SelectLabel className="text-center">
                          Regimen subsidiado
                        </SelectLabel>
                        <SelectSeparator />
                        {epsList.map(
                          (eps) =>
                            eps.regime.toLowerCase() === "subsidiado" && (
                              <SelectItem
                                key={eps.id}
                                value={eps.nit.toString()}
                              >
                                {eps.entity}
                              </SelectItem>
                            )
                        )}
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel className="text-center">
                          Regimen contributivo
                        </SelectLabel>
                        <SelectSeparator />
                        {epsList.map(
                          (eps) =>
                            eps.regime.toLowerCase() === "contributivo" && (
                              <SelectItem
                                key={eps.id}
                                value={eps.nit.toString()}
                              >
                                {eps.entity}
                              </SelectItem>
                            )
                        )}
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel className="text-center">
                          Ambos regimenes
                        </SelectLabel>
                        <SelectSeparator />
                        {epsList.map(
                          (eps) =>
                            eps.regime.toLowerCase() === "ambos regimenes" && (
                              <SelectItem
                                key={eps.id}
                                value={eps.nit.toString()}
                              >
                                {eps.entity}
                              </SelectItem>
                            )
                        )}
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

        <Button type="submit" disabled={isCreating} className="w-full">
          {isCreating ? "Creando..." : "Crear Paciente"}
        </Button>
      </form>
    </div>
  );
}
