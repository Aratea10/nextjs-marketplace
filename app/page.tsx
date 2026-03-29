import { getAds } from "@/lib/ads";
import AdCard from "@/components/AdCard";

export default async function HomePage() {
  const ads = await getAds();

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">Marketplace de Anuncios</h1>
      <p className="mt-2 text-gray-600">
        Compra y vende artículos de segunda mano
      </p>

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
          No hay anuncios disponibles
        </p>
      )}
    </main>
  );
}
