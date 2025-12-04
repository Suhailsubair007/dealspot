import { useRecentProducts } from "@shopify/shop-minis-react";
import ScreenContainer from "../components/layout/ScreenContainer";
import SpotTile from "../components/common/SpotTile";
import ProductCard from "../components/product/ProductCard";
import { SPOT_CONFIGS } from "../constants";
import SkeletonProductCard from "../components/common/SkeletonProductCard";

export default function HomeScreen() {
  const { products: recentProducts, loading } = useRecentProducts({ first: 4 });
  
  // Prevent flicker: show skeleton during initial load or when products is null
  const isLoading = loading || recentProducts === null;
  const hasProducts = recentProducts && recentProducts.length > 0;

  return (
    <ScreenContainer>
      {/* Hero Section */}
      <div className="px-5 pt-10 pb-8">
        <h1 className="text-5xl font-semibold bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] bg-clip-text text-transparent mb-3 leading-tight">DealSpot</h1>
        <p className="text-base text-[#7A85C1] font-normal leading-relaxed">Find your next shopping spot.</p>
      </div>

      {/* Spot Tiles Grid */}
      <div className="px-5 pb-8">
        <div className="grid grid-cols-2 gap-5">
          {SPOT_CONFIGS.map((spot) => (
            <SpotTile
              key={spot.id}
              title={spot.title}
              description={spot.description}
              icon={spot.icon}
              path={spot.path}
          />
        ))}
      </div>
    </div>

      {/* Continue Exploring Section */}
      <div className="px-5 pb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#1A2A80] mb-1.5 leading-tight">
            Continue exploring
          </h2>
          <p className="text-sm text-[#7A85C1] font-normal">Pick up where you left off</p>
        </div>
        {isLoading ? (
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-5 px-5 scrollbar-hide">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-[0_0_75%] snap-start flex-shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
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
                  {/* Gradient border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] rounded-3xl opacity-0 group-active:opacity-30 blur-sm transition-opacity duration-300" />
                  {/* Card container */}
                  <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg border border-gray-100/50 backdrop-blur-sm pb-1">
                    <ProductCard product={product} className="rounded-3xl" />
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#B2B0E8]/10 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-[#7A85C1] font-normal">No recent products to show</p>
          </div>
        )}
      </div>
    </ScreenContainer>
  );
}
