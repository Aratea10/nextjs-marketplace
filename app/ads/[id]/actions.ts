"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function likeAdAction(adId: number) {
    await prisma.ad.update({
        where: { id: adId },
        data: {
            likes: { increment: 1 },
        },
    });

    revalidatePath(`/ads/${adId}`);
    revalidatePath("/");
}
