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
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3 mt-4">
            <input
                type="text"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre..."
                className="flex-1 min-w-[180px] px-4 py-1.5 rounded-xl border border-gray-200 bg-gray-50 outline-none text-sm transition-all focus:border-[#13c1ac] focus:ring-2 focus:ring-[#13c1ac]/20 focus:bg-white"
            />

            <input
                type="number"
                name="price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Precio máximo"
                min="0"
                className="w-40 px-4 py-1.5 rounded-xl border border-gray-200 bg-gray-50 outline-none text-sm transition-all focus:border-[#13c1ac] focus:ring-2 focus:ring-[#13c1ac]/20 focus:bg-white"
            />

            <select
                name="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="px-4 py-1.5 rounded-xl border border-gray-200 bg-gray-50 outline-none text-sm transition-all focus:border-[#13c1ac] focus:ring-2 focus:ring-[#13c1ac]/20 focus:bg-white"
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
                className="bg-brand text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
                Buscar
            </button>

            <button
                type="button"
                onClick={handleClear}
                className="border border-gray-200 px-5 py-1.5 rounded-full text-sm text-gray-500 hover:bg-gray-50 transition-all"
            >
                Limpiar
            </button>
        </form>
    );
}
