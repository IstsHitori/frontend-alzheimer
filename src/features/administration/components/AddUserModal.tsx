import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useCreateUser, useUser } from "../hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import type { CreateUser } from "../types/user.types";
import { createUserSchema, USER_ROLE } from "../schemas/user.schemas";

export function AddUserModal() {
  const defaultValues: CreateUser = {
    name: "",
    email: "",
    userName: "",
    password: "",
    role: USER_ROLE.DOCTOR,
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(createUserSchema),
  });

  const { isAddUserOpen, setIsAddUserOpen } = useUser();
  const {
    createUserMutation: { isPending, mutate },
  } = useCreateUser();

  const onSubmit: SubmitHandler<CreateUser> = async (newUser) => {
    mutate(newUser);
    handleOpenChange(false);
  };

  const handleClose = () => {
    reset();
    setIsAddUserOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    } else {
      setIsAddUserOpen(true);
    }
  };

  return (
    <Dialog open={isAddUserOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full sm:w-auto">
          <UserPlus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Agregar Usuario</span>
          <span className="sm:hidden">Agregar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
          <DialogDescription>
            Complete el formulario para crear un nuevo usuario en el sistema
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              control={control}
              name="userName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">Nombre de Usuario</FieldLabel>
                  <Input
                    {...field}
                    id="username"
                    aria-invalid={fieldState.invalid}
                    placeholder="usuario123"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Dr. Juan Perez"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="usuario@hospital.co"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              control={control}
              name="role"
              render={({ field, fieldState }) => (
                <Field
                  orientation={"responsive"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="role">Rol</FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="role"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Selecciona un rol</SelectItem>
                      <SelectSeparator />
                      <SelectItem value={"doctor"}>{"Doctor"}</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1 disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? "Creando usuario..." : "Crear usuario"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
