import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-6xl font-bold text-gray-300">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Página no encontrada</h2>
            <p className="text-gray-500 mt-2">
                La página que buscas no existe o ha sido eliminada.
            </p>
            <Link
                href="/"
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Volver al inicio
            </Link>
        </main>
    );
}
