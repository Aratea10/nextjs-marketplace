export default function AdCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-100" />
            <div className="p-4">
                <div className="h-5 bg-gray-100 rounded-lg w-3/4" />
                <div className="h-7 bg-gray-100 rounded-lg w-1/3 mt-2" />
                <div className="h-4 bg-gray-100 rounded-lg w-full mt-3" />
                <div className="h-4 bg-gray-100 rounded-lg w-2/3 mt-1" />
                <div className="flex gap-1.5 mt-3">
                    <div className="h-6 bg-gray-100 rounded-full w-16" />
                    <div className="h-6 bg-gray-100 rounded-full w-16" />
                </div>
            </div>
        </div>
    );
}
