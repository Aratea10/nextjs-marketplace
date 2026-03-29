"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";
import Link from "next/link";

const initialState: LoginState = {};

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(
        loginAction,
        initialState
    );

    return (
        <main className="min-h-screen flex items-center justify-center p-8">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-center">Iniciar sesión</h1>
                <p className="text-gray-500 text-center mt-2">
                    Accede a tu cuenta de Marketplace
                </p>

                <form action={formAction} className="mt-8 space-y-4">
                    {state.message && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                            {state.message}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="tu@email.com"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                        {state.errors?.email && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-1"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                        {state.errors?.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {state.errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {isPending ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    <Link href="/" className="text-blue-600 hover:underline">
                        ← Volver a la lista
                    </Link>
                </p>
            </div>
        </main>
    );
}
