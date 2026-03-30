import Link from "next/link";
import LikeButton from "./LikeButton";

type AdCardProps = {
    id: number;
    title: string;
    description: string;
    price: number;
    tags: string[];
    imageUrl: string | null;
    likes: number;
};

export default function AdCard({
    id,
    title,
    description,
    price,
    tags,
    imageUrl,
    likes,
}: AdCardProps) {
    return (
        <article className="ad-card">
            <Link href={`/ads/${id}`}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-48 object-cover"
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                        Sin imagen
                    </div>
                )}
                <div className="p-4">
                    <h2 className="text-base font-semibold text-gray-800">{title}</h2>
                    <p className="text-xl font-bold text-brand mt-1">{price} €</p>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-brand bg-emerald-50 text-xs px-2.5 py-1 rounded-full font-medium"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
            <div className="px-4 pb-4">
                <LikeButton adId={id} likes={likes} />
            </div>
        </article>
    );
}
