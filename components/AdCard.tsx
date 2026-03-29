import Link from "next/link";

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
        <Link href={`/ads/${id}`}>
            <article className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-48 object-cover"
                    />
                )}
                <div className="p-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-2xl font-bold text-green-600 mt-1">{price} €</p>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className="text-gray-400 text-xs mt-3">❤️ {likes}</p>
                </div>
            </article>
        </Link>
    );
}
