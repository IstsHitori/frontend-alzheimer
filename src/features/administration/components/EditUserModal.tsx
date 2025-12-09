import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useEffect } from "react";
import { useUpdateUser, useUser } from "../hooks";
import type { UpdateUser } from "../types/user.types";
import { updateUserSchema, USER_ROLE } from "../schemas/user.schemas";

export function EditUserModal() {
  const { editingUser, isEditUserOpen, setIsEditUserOpen, setEditingUser } =
    useUser();

  const defaultValues: UpdateUser = {
    id: editingUser?.id || "",
    name: editingUser?.name || "",
    email: editingUser?.email || "",
    userName: editingUser?.userName || "",
    role: editingUser?.role || USER_ROLE.DOCTOR,
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (editingUser?.id) {
      reset({
        id: editingUser.id,
        name: editingUser.name,
        email: editingUser.email,
        userName: editingUser.userName,
        role: editingUser.role,
      });
    }
  }, [editingUser, reset]);

  const {
    updateUserMutation: { isPending, mutate },
  } = useUpdateUser();

  const onSubmit: SubmitHandler<UpdateUser> = async (user) => {
    mutate({ user });
    handleOpenChange(false);
  };

  const handleClose = () => {
    reset();
    setIsEditUserOpen(false);
    setEditingUser({} as UpdateUser);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    } else {
      setIsEditUserOpen(true);
    }
  };

  return (
    <Dialog open={isEditUserOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Actualice los datos del usuario. La contraseña es opcional (déjela
            vacía para mantener la actual)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              control={control}
              name="userName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-username">
                    Nombre de Usuario
                  </FieldLabel>
                  <Input
                    {...field}
                    id="edit-username"
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
                  <FieldLabel htmlFor="edit-name">Nombre completo</FieldLabel>
                  <Input
                    {...field}
                    id="edit-name"
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
                  <FieldLabel htmlFor="edit-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="edit-email"
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
              name="role"
              render={({ field, fieldState }) => (
                <Field
                  orientation={"responsive"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="edit-role">Rol</FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="edit-role"
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
              {isPending ? "Guardando cambios..." : "Guardar cambios"}
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
