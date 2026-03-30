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
            <div className="w-full max-w-md card-container">
                <h1 className="logo-title text-3xl text-brand text-center">
                    Marketplace
                </h1>
                <p className="text-gray-400 text-center mt-2">
                    Bienvenido de nuevo
                </p>

                <form action={formAction} className="mt-8 space-y-4">
                    {state.message && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
                            {state.message}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="tu@email.com"
                            className="input-field"
                        />
                        {state.errors?.email && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            className="input-field"
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
                        className="btn-primary disabled:opacity-50"
                    >
                        {isPending ? "Entrando..." : "Iniciar sesión"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    <Link href="/" className="text-brand hover:underline">
                        Volver al inicio
                    </Link>
                </p>
            </div>
        </main>
    );
}
