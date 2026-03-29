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
            <h1 className="text-6xl font-bold text-gray-300">500</h1>
            <h2 className="text-2xl font-semibold mt-4">Algo salió mal</h2>
            <p className="text-gray-500 mt-2">
                {error.message || "Ha ocurrido un error inesperado."}
            </p>
            <button
                onClick={reset}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Intentar de nuevo
            </button>
        </main>
    );
}
