"use server";

import prisma from "@/lib/prisma";
import { createAdSchema } from "@/schemas/ad.schema";
import { verifyToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateAdState = {
    errors?: Record<string, string>;
    message?: string;
};

export async function createAdAction(
    _prevState: CreateAdState,
    formData: FormData
): Promise<CreateAdState> {
    const user = await verifyToken();

    if (!user) {
        return { message: "Debes iniciar sesión para crear un anuncio" };
    }

    const raw = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        price: formData.get("price") as string,
        tags: formData.get("tags") as string,
        imageUrl: formData.get("imageUrl") as string,
    };

    const result = createAdSchema.safeParse(raw);

    if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
            const field = issue.path[0] as string;
            fieldErrors[field] = issue.message;
        }
        return { errors: fieldErrors };
    }

    const { title, description, price, tags, imageUrl } = result.data;

    await prisma.ad.create({
        data: {
            title,
            description,
            price,
            tags: tags
                ? tags.split(",").map((t) => t.trim()).filter(Boolean)
                : [],
            imageUrl: imageUrl || null,
            userId: user.userId,
        },
    });

    revalidatePath("/");

    redirect("/");
}
