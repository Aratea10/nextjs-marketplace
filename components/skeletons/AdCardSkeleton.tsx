export default function AdCardSkeleton() {
    return (
        <div className="rounded-lg border border-gray-200 overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-200" />
            <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-7 bg-gray-200 rounded w-1/3 mt-2" />
                <div className="h-4 bg-gray-200 rounded w-full mt-3" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mt-1" />
                <div className="flex gap-1 mt-3">
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                </div>
            </div>
        </div>
    );
}
