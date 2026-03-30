import { getAdById } from "@/lib/ads";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import LikeButton from "@/components/LikeButton";

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
                className="text-brand hover:underline text-sm font-medium"
            >
                ← Volver al listado
            </Link>

            <div className="mt-6 card-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ad.imageUrl ? (
                        <img
                            src={ad.imageUrl}
                            alt={ad.title}
                            className="w-full rounded-2xl object-cover"
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                            Sin imagen
                        </div>
                    )}

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{ad.title}</h1>
                        <p className="text-3xl font-bold text-brand mt-2">{ad.price} €</p>

                        <div className="flex flex-wrap gap-1.5 mt-4">
                            {ad.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-brand bg-emerald-50 text-sm px-3 py-1 rounded-full font-medium"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-500 mt-6 leading-relaxed">
                            {ad.description}
                        </p>

                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <p className="text-gray-400 text-sm">
                                Vendido por{" "}
                                <span className="font-semibold text-gray-600">
                                    {ad.userName}
                                </span>
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                Publicado el{" "}
                                {new Date(ad.createdAt).toLocaleDateString("es-ES", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>

                        <div className="mt-4">
                            <LikeButton adId={ad.id} likes={ad.likes} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
