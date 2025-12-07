import { z } from "zod";

export enum USER_ROLE {
  DOCTOR = "doctor",
  ADMIN = "admin",
}

export const crudUserResponse = z.string();

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  userName: z.string(),
  password: z.string(),
  email: z.email(),
  role: z.enum(USER_ROLE),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastAcces: z.string().nullable(),
});

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  userName: z
    .string()
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
    .max(10, "El nombre de usuario no puede exceder 10 caracteres"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(20, "La contraseña no puede exceder 20 caracteres")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/,
      "La contraseña debe contener al menos una mayúscula, un número y un carácter especial (@#$%^&+=!)"
    ),
  email: z
    .email("Debe ser un correo electrónico válido")
    .max(100, "El correo no puede exceder 100 caracteres"),
  role: z.enum(USER_ROLE, "El rol debe ser un valor válido"),
});

export const updateUserSchema = createUserSchema
  .omit({ password: true })
  .extend({
    id: z.uuid(),
  });

export const arrayUserSchema = z.array(userSchema);
