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

export type AdFilters = {
    query?: string;
    maxPrice?: number;
    tag?: string;
};

export async function getAds(filters: AdFilters = {}): Promise<AdDTO[]> {
    const { query, maxPrice, tag } = filters;

    const ads = await prisma.ad.findMany({
        where: {
            ...(query && {
                title: {
                    contains: query,
                    mode: "insensitive" as const,
                },
            }),
            ...(maxPrice && {
                price: {
                    lte: maxPrice,
                },
            }),
            ...(tag && {
                tags: {
                    has: tag,
                },
            }),
        },
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
