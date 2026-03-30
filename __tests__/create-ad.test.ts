import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
    default: {
        ad: {
            create: vi.fn().mockResolvedValue({ id: 1 }),
        },
    },
}));

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));

const mockVerifyToken = vi.fn();
vi.mock("@/lib/auth", () => ({
    verifyToken: () => mockVerifyToken(),
}));

import { createAdAction } from "@/app/ads/create/actions";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

function createFormData(data: Record<string, string>): FormData {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
    }
    return formData;
}

describe("createAdAction (Server Action)", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockVerifyToken.mockResolvedValue({
            userId: "user-1",
            email: "sara@example.com",
        });
    });

    it("should create an ad and redirect when data is valid", async () => {
        const formData = createFormData({
            title: "iPhone 17 Pro",
            description: "iPhone 17 Pro en perfecto estado con caja original",
            price: "1000",
            tags: "móvil, apple",
            imageUrl: "https://example.com/image.jpg",
        });

        await createAdAction({}, formData);

        expect(prisma.ad.create).toHaveBeenCalledWith({
            data: {
                title: "iPhone 17 Pro",
                description: "iPhone 17 Pro en perfecto estado con caja original",
                price: 1000,
                tags: ["móvil", "apple"],
                imageUrl: "https://example.com/image.jpg",
                userId: "user-1",
            },
        });

        expect(redirect).toHaveBeenCalledWith("/");
    });

    it("should return errors when title is too short", async () => {
        const formData = createFormData({
            title: "ab",
            description: "Una descripción válida con más de 10 caracteres",
            price: "100",
            tags: "",
            imageUrl: "",
        });

        const result = await createAdAction({}, formData);

        expect(result.errors?.title).toBeDefined();
        expect(prisma.ad.create).not.toHaveBeenCalled();
    });

    it("should return errors when description is too short", async () => {
        const formData = createFormData({
            title: "Un título válido",
            description: "Corta",
            price: "100",
            tags: "",
            imageUrl: "",
        });

        const result = await createAdAction({}, formData);

        expect(result.errors?.description).toBeDefined();
        expect(prisma.ad.create).not.toHaveBeenCalled();
    });

    it("should return errors when price is empty", async () => {
        const formData = createFormData({
            title: "Un título válido",
            description: "Una descripción válida con más de 10 caracteres",
            price: "",
            tags: "",
            imageUrl: "",
        });

        const result = await createAdAction({}, formData);

        expect(result.errors?.price).toBeDefined();
        expect(prisma.ad.create).not.toHaveBeenCalled();
    });

    it("should return message when user is not authenticated", async () => {
        mockVerifyToken.mockResolvedValue(null);

        const formData = createFormData({
            title: "iPhone 17 Pro",
            description: "iPhone 17 Pro en perfecto estado con caja original",
            price: "1000",
            tags: "",
            imageUrl: "",
        });

        const result = await createAdAction({}, formData);

        expect(result.message).toBe("Debes iniciar sesión para crear un anuncio");
        expect(prisma.ad.create).not.toHaveBeenCalled();
    });

    it("should create an ad without optional fields", async () => {
        const formData = createFormData({
            title: "Un título válido",
            description: "Una descripción válida con más de 10 caracteres",
            price: "50",
            tags: "",
            imageUrl: "",
        });

        await createAdAction({}, formData);

        expect(prisma.ad.create).toHaveBeenCalledWith({
            data: {
                title: "Un título válido",
                description: "Una descripción válida con más de 10 caracteres",
                price: 50,
                tags: [],
                imageUrl: null,
                userId: "user-1",
            },
        });

        expect(redirect).toHaveBeenCalledWith("/");
    });
});
