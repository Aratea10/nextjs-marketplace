"use client";

import { useActionState } from "react";
import { createAdAction, type CreateAdState } from "./actions";
import Link from "next/link";

const initialState: CreateAdState = {};

export default function CreateAdPage() {
    const [state, formAction, isPending] = useActionState(
        createAdAction,
        initialState
    );

    return (
        <main className="min-h-screen p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold">Crear anuncio</h1>
            <p className="text-gray-500 mt-2">Publica un artículo en el Marketplace</p>

            <form action={formAction} className="mt-8 space-y-4">
                {state.message && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                        {state.message}
                    </div>
                )}

                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Ej: iPhone 17 Pro"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    {state.errors?.title && (
                        <p className="text-red-500 text-xs mt-1">{state.errors.title}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        placeholder="Describe el artículo..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    {state.errors?.description && (
                        <p className="text-red-500 text-xs mt-1">{state.errors.description}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium mb-1">
                        Precio (€)
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    {state.errors?.price && (
                        <p className="text-red-500 text-xs mt-1">{state.errors.price}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-1">
                        Tags <span className="text-gray-400 font-normal">(separados por comas)</span>
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        placeholder="Ej: tecnología, móvil, apple"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                        URL de imagen <span className="text-gray-400 font-normal">(opcional)</span>
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="https://..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    {state.errors?.imageUrl && (
                        <p className="text-red-500 text-xs mt-1">{state.errors.imageUrl}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                    {isPending ? "Publicando..." : "Publicar anuncio"}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                <Link href="/" className="text-blue-600 hover:underline">
                    ← Volver a la lista
                </Link>
            </p>
        </main>
    );
}
