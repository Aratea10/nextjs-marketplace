import { z } from "zod/v4";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "El email es obligatorio")
        .email("El email no es válido"),
    password: z
        .string()
        .min(1, "La contraseña es obligatoria"),
});

export type LoginInput = z.infer<typeof loginSchema>;
