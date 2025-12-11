import { useRecentProducts } from "@shopify/shop-minis-react";
import SpotTile from "../common/SpotTile";
import ProductCard from "../product/ProductCard";
import { SPOT_CONFIGS } from "../../constants";
import SkeletonProductCard from "../common/SkeletonProductCard";
import type { TabId } from "../navigation/StickyTabBar";

interface HomeTabProps {
  onTabChange?: (tabId: TabId) => void;
}

export default function HomeTab({ onTabChange }: HomeTabProps) {
  const { products: recentProducts, loading } = useRecentProducts({ first: 6 });

  const isLoading = loading || recentProducts === null;
  const hasProducts = recentProducts && recentProducts.length > 0;

  return (
    <div className="pb-8">
      {/* Hero Section */}
      <div className="px-5 pt-8 pb-6 relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1A2A80]/10 via-[#3B38A0]/5 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute top-8 left-0 w-24 h-24 bg-gradient-to-br from-[#7A85C1]/10 to-transparent rounded-full blur-2xl -z-10" />

        <div className="relative">
          <h1 className="text-5xl font-bold mb-3 leading-[1.1] tracking-tight">
            <span className="block bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] bg-clip-text text-transparent drop-shadow-sm">
              Deal
            </span>
            <span className="block bg-gradient-to-r from-[#3B38A0] via-[#7A85C1] to-[#B2B0E8] bg-clip-text text-transparent drop-shadow-sm">
              Spot
            </span>
          </h1>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-0.5 w-8 bg-gradient-to-r from-[#1A2A80] to-[#3B38A0] rounded-full" />
            <p className="text-base text-[#7A85C1] font-medium leading-relaxed">
              Find your next shopping spot
            </p>
          </div>
        </div>
      </div>

      {/* Spot Tiles Grid */}
      <div className="px-5 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {SPOT_CONFIGS.map((spot) => (
            <SpotTile
              key={spot.id}
              title={spot.title}
              description={spot.description}
              icon={spot.icon}
              onClick={() => {
                const tabMap: Record<string, TabId> = {
                  trending: "trending",
                  recommended: "recommended",
                  recent: "recent",
                  saved: "saved",
                };
                const tabId = tabMap[spot.id];
                if (tabId && onTabChange) {
                  onTabChange(tabId);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Continue Exploring Section */}
      <div className="px-5 pb-6">
        <div className="mb-5 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#1A2A80] to-[#3B38A0] animate-pulse" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] bg-clip-text text-transparent leading-tight">
              Continue exploring
            </h2>
          </div>
          <p className="text-sm text-[#7A85C1] font-medium ml-4">
            Pick up where you left off
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B2B0E8]/30 to-transparent mt-2" />
        </div>
        {isLoading ? (
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-5 px-5 scrollbar-hide">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-[0_0_75%] snap-start flex-shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] rounded-3xl opacity-0 group-active:opacity-20 blur transition-opacity duration-300" />
                  <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg">
                    <SkeletonProductCard />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : hasProducts ? (
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-5 px-5 scrollbar-hide">
            {recentProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="flex-[0_0_75%] snap-start flex-shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] rounded-3xl opacity-0 group-active:opacity-30 blur-sm transition-opacity duration-300" />
                  <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg border border-gray-100/50 backdrop-blur-sm pb-1 max-h-[450px]">
                    <ProductCard product={product} className="rounded-3xl" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#B2B0E8]/10 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-[#7A85C1] font-normal">
              No recent products to show
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
