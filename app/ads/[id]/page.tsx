import { getAdById } from "@/lib/ads";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import HeartIcon from "@/components/HeartIcon";

type AdDetailProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({
    params,
}: AdDetailProps): Promise<Metadata> {
    const { id } = await params;
    const ad = await getAdById(Number(id));

    if (!ad) {
        return { title: "Anuncio no encontrado" };
    }

    return {
        title: `${ad.title} - ${ad.price} € | Marketplace`,
        description: ad.description,
    };
}

export default async function AdDetailPage({ params }: AdDetailProps) {
    const { id } = await params;
    const ad = await getAdById(Number(id));

    if (!ad) {
        notFound();
    }

    return (
        <main className="min-h-screen p-8 max-w-4xl mx-auto">
            <Link
                href="/"
                className="text-blue-600 hover:underline text-sm"
            >
                ← Volver a la lista
            </Link>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {ad.imageUrl && (
                    <img
                        src={ad.imageUrl}
                        alt={ad.title}
                        className="w-full rounded-lg object-cover"
                    />
                )}

                <div>
                    <h1 className="text-3xl font-bold">{ad.title}</h1>
                    <p className="text-4xl font-bold text-green-600 mt-2">
                        {ad.price} €
                    </p>

                    <div className="flex flex-wrap gap-1 mt-4">
                        {ad.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-600 mt-6 leading-relaxed">
                        {ad.description}
                    </p>

                    <p className="text-gray-400 text-sm mt-6">
                        <span className="inline-flex items-center gap-1">
                            <HeartIcon className="w-5 h-5 text-red-500" /> {ad.likes} me gusta
                        </span>
                    </p>
                    <p className="text-gray-500 text-sm mt-4">
                        Vendido por <span className="font-semibold">{ad.userName}</span>
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                        Publicado el{" "}
                        {new Date(ad.createdAt).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </div>
        </main>
    );
}
