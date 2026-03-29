import prisma from "./prisma";

export type AdDTO = {
    id: number;
    title: string;
    description: string;
    price: number;
    tags: string[];
    imageUrl: string | null;
    likes: number;
    createdAt: Date;
    userId: string;
};

export async function getAds(): Promise<AdDTO[]> {
    const ads = await prisma.ad.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            description: true,
            price: true,
            tags: true,
            imageUrl: true,
            likes: true,
            createdAt: true,
            userId: true,
        },
    });

    return ads;
}
