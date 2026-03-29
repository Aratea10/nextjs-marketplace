import AdCardSkeleton from "@/components/skeletons/AdCardSkeleton";

export default function Loading() {
    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto">
            <div className="h-9 bg-gray-200 rounded w-80 animate-pulse" />
            <div className="h-5 bg-gray-200 rounded w-64 mt-2 animate-pulse" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <AdCardSkeleton key={i} />
                ))}
            </div>
        </main>
    );
}
