import { z } from "zod/v4";

export const createAdSchema = z.object({
    title: z
        .string()
        .min(3, "El título debe tener al menos 3 caracteres")
        .max(100, "El título no puede superar los 100 caracteres"),
    description: z
        .string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(1000, "La descripción no puede superar los 1000 caracteres"),
    price: z
        .string()
        .min(1, "El precio es obligatorio")
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val) && val > 0, "El precio debe ser mayor que 0"),
    tags: z.string().optional(),
    imageUrl: z.string().url("La URL de imagen no es válida").optional().or(z.literal("")),
});

export type CreateAdInput = z.infer<typeof createAdSchema>;
