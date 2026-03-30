import { getAds } from "@/lib/ads";
import AdCard from "@/components/AdCard";
import SearchFilters from "@/components/SearchFilters";

type HomePageProps = {
  searchParams: Promise<{
    query?: string;
    price?: string;
    tag?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { query, price, tag } = await searchParams;

  const ads = await getAds({
    query,
    maxPrice: price ? Number(price) : undefined,
    tag,
  });

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <p className="mt-2 text-gray-600">
        Compra y vende artículos de segunda mano
      </p>

      <SearchFilters />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            id={ad.id}
            title={ad.title}
            description={ad.description}
            price={ad.price}
            tags={ad.tags}
            imageUrl={ad.imageUrl}
            likes={ad.likes}
          />
        ))}
      </div>

      {ads.length === 0 && (
        <p className="text-gray-500 text-center mt-12">
          No se encontraron anuncios con esos filtros
        </p>
      )}
    </main>
  );
}
