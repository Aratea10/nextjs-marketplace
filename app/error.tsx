"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-7xl font-bold text-gray-200">500</h1>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
                Algo salió mal
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
                {error.message || "Ha ocurrido un error inesperado."}
            </p>
            <button
                onClick={reset}
                className="mt-6 bg-brand text-white font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
                Intentar de nuevo
            </button>
        </main>
    );
}
