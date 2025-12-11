import { useMemo } from "react";
import { useSavedProducts, ProductCard, Skeleton } from "@shopify/shop-minis-react";
import { Heart } from "lucide-react";
import OfferBadge from "../components/OfferBadge";
import { isDiscounted } from "../utils/productUtils";

export default function SavedScreen() {
  const { products, loading } = useSavedProducts({
    first: 30,
  });

  // Filter to only show discounted saved products
  const savedDeals = useMemo(() => {
    if (!products) return [];
    return products.filter(isDiscounted);
  }, [products]);

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#F5EFE7]/5 via-white to-white min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-gradient-to-br from-white via-white to-[#F5EFE7]/10 backdrop-blur-md border-b border-[#F5EFE7]/40 shadow-md px-4 pt-12 pb-5 safe-area-top">
        <div className="flex items-center gap-3 mb-2 pt-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#3E5879] to-[#213555] shadow-md">
            <Heart className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Your Saved Deals</h1>
            <p className="text-sm text-gray-600 font-medium">Deals from your saved products</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="rounded-2xl overflow-hidden shadow-md bg-white animate-pulse"
                style={{
                  animation: `fadeIn 0.3s ease-out ${index * 50}ms both`,
                }}
              >
                <Skeleton className="w-full aspect-square rounded-t-2xl" />
                <div className="space-y-2 px-3 py-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-5 w-2/3 mt-1" />
                </div>
              </div>
            ))}
          </div>
        ) : savedDeals.length > 0 ? (
          <>
            <div className="mb-4 px-1">
              <p className="text-sm text-gray-500">
                Found <span className="font-semibold text-[#213555]">{savedDeals.length}</span> {savedDeals.length === 1 ? 'deal' : 'deals'} with offers
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {savedDeals.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl overflow-hidden shadow-lg bg-white relative transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                >
                  <OfferBadge product={product} />
                  <div className="p-3">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="p-4 rounded-full bg-[#F5EFE7]/30 mb-4">
              <Heart className="w-12 h-12 text-[#D8C4B6]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No saved deals yet</h3>
            <p className="text-base text-gray-600 font-medium text-center max-w-xs">
              Save products with deals to see them here. Browse the home screen to find great deals!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
