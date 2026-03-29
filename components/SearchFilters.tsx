"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get("query") ?? "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("price") ?? "");
    const [tag, setTag] = useState(searchParams.get("tag") ?? "");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (query.trim()) {
            params.set("query", query.trim());
        }

        if (maxPrice) {
            params.set("price", maxPrice);
        }

        if (tag) {
            params.set("tag", tag);
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleClear = () => {
        setQuery("");
        setMaxPrice("");
        setTag("");
        router.replace(pathname);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 mt-6">
            <input
                type="text"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre..."
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-[180px]"
            />

            <input
                type="number"
                name="price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Precio máximo"
                min="0"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-36"
            />

            <select
                name="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
                <option value="">Todas las categorías</option>
                <option value="tecnología">Tecnología</option>
                <option value="deporte">Deporte</option>
                <option value="hogar">Hogar</option>
                <option value="gaming">Gaming</option>
                <option value="música">Música</option>
                <option value="apple">Apple</option>
            </select>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
                Buscar
            </button>

            <button
                type="button"
                onClick={handleClear}
                className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
                Limpiar
            </button>
        </form>
    );
}
