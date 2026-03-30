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
            <div className="card-container">
                <h1 className="text-2xl font-bold text-gray-800">Publicar anuncio</h1>

                <form action={formAction} className="mt-6 space-y-4">
                    {state.message && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
                            {state.message}
                        </div>
                    )}

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">
                            Nombre del producto <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Ej: iPhone 17 Pro"
                            className="input-field"
                        />
                        {state.errors?.title && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">
                            Descripción <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            placeholder="Describe el artículo..."
                            className="input-field"
                        />
                        {state.errors?.description && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-600 mb-1">
                            Precio (€) <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="input-field"
                        />
                        {state.errors?.price && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.price}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-600 mb-1">
                            Tags <span className="text-gray-400 font-normal">(separados por comas)</span>
                        </label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            placeholder="Ej: tecnología, móvil, apple"
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-600 mb-1">
                            URL de imagen <span className="text-gray-400 font-normal">(opcional)</span>
                        </label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            placeholder="https://..."
                            className="input-field"
                        />
                        {state.errors?.imageUrl && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.imageUrl}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="btn-primary disabled:opacity-50"
                    >
                        {isPending ? "Publicando..." : "Publicar anuncio"}
                    </button>
                </form>
            </div>

            <p className="text-center text-sm text-gray-400 mt-6">
                <Link href="/" className="text-brand hover:underline">
                    ← Volver al listado
                </Link>
            </p>
        </main>
    );
}
