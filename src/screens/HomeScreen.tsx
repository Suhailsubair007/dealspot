import { useRecentProducts } from "@shopify/shop-minis-react";
import ScreenContainer from "../components/layout/ScreenContainer";
import SpotTile from "../components/common/SpotTile";
import ProductCard from "../components/product/ProductCard";
import { SPOT_CONFIGS } from "../constants";
import SkeletonProductCard from "../components/common/SkeletonProductCard";

export default function HomeScreen() {
  const { products: recentProducts, loading } = useRecentProducts({ first: 6 });
  
  // Prevent flicker: show skeleton during initial load or when products is null
  const isLoading = loading || recentProducts === null;
  const hasProducts = recentProducts && recentProducts.length > 0;

  return (
    <ScreenContainer>
      {/* Hero Section */}
      <div className="px-5 pt-10 pb-8 relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1A2A80]/10 via-[#3B38A0]/5 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute top-8 left-0 w-24 h-24 bg-gradient-to-br from-[#7A85C1]/10 to-transparent rounded-full blur-2xl -z-10" />
        
        <div className="relative">
          <h1 className="text-6xl font-bold mb-4 leading-[1.1] tracking-tight">
            <span className="block bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] bg-clip-text text-transparent drop-shadow-sm">
              Deal
            </span>
            <span className="block bg-gradient-to-r from-[#3B38A0] via-[#7A85C1] to-[#B2B0E8] bg-clip-text text-transparent drop-shadow-sm">
              Spot
            </span>
          </h1>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-0.5 w-8 bg-gradient-to-r from-[#1A2A80] to-[#3B38A0] rounded-full" />
            <p className="text-base text-[#7A85C1] font-medium leading-relaxed">Find your next shopping spot</p>
          </div>
        </div>
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
        <div className="mb-6 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#1A2A80] to-[#3B38A0] animate-pulse" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] bg-clip-text text-transparent leading-tight">
              Continue exploring
            </h2>
          </div>
          <p className="text-sm text-[#7A85C1] font-medium ml-4">Pick up where you left off</p>
          {/* Decorative underline */}
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
                  {/* Gradient border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] rounded-3xl opacity-0 group-active:opacity-30 blur-sm transition-opacity duration-300" />
                  {/* Card container */}
                  <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg border border-gray-100/50 backdrop-blur-sm pb-1 max-h-[450px]">
                    <ProductCard  product={product} className="rounded-3xl" />
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
