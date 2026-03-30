import { describe, it, expect, vi, beforeEach } from "vitest";
import { createAdSchema } from "@/schemas/ad.schema";

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));

describe("createAdSchema (Zod validation)", () => {
    it("should validate a correct ad", () => {
        const validAd = {
            title: "iPhone 17 Pro",
            description: "iPhone 17 Pro en perfecto estado con caja original",
            price: "1000",
            tags: "móvil, apple",
            imageUrl: "https://example.com/image.jpg",
        };

        const result = createAdSchema.safeParse(validAd);
        expect(result.success).toBe(true);
    });

    it("should fail if title is too short", () => {
        const invalidAd = {
            title: "ab",
            description: "Una descripción válida con más de 10 caracteres",
            price: "100",
        };

        const result = createAdSchema.safeParse(invalidAd);
        expect(result.success).toBe(false);
    });

    it("should fail if description is too short", () => {
        const invalidAd = {
            title: "Un título válido",
            description: "Corta",
            price: "100",
        };

        const result = createAdSchema.safeParse(invalidAd);
        expect(result.success).toBe(false);
    });

    it("should fail if price is zero or negative", () => {
        const invalidAd = {
            title: "Un título válido",
            description: "Una descripción válida con más de 10 caracteres",
            price: "0",
        };

        const result = createAdSchema.safeParse(invalidAd);
        expect(result.success).toBe(false);
    });

    it("should fail if price is empty", () => {
        const invalidAd = {
            title: "Un título válido",
            description: "Una descripción válida con más de 10 caracteres",
            price: "",
        };

        const result = createAdSchema.safeParse(invalidAd);
        expect(result.success).toBe(false);
    });

    it("should accept an ad without optional fields", () => {
        const minimalAd = {
            title: "Un título válido",
            description: "Una descripción válida con más de 10 caracteres",
            price: "50",
        };

        const result = createAdSchema.safeParse(minimalAd);
        expect(result.success).toBe(true);
    });

    it("should fail if imageUrl is not a valid URL", () => {
        const invalidAd = {
            title: "Un título válido",
            description: "Una descripción válida con más de 10 caracteres",
            price: "50",
            imageUrl: "no-es-una-url",
        };

        const result = createAdSchema.safeParse(invalidAd);
        expect(result.success).toBe(false);
    });
});
