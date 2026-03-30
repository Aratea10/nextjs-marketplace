import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-7xl font-bold text-gray-200">404</h1>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
                Este anuncio no existe
            </h2>
            <Link
                href="/"
                className="mt-6 bg-brand text-white font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
                Volver al inicio
            </Link>
        </main>
    );
}
