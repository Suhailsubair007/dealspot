import { useState, useRef, useEffect } from "react";
import StickyTabBar, { type TabId } from "../components/navigation/StickyTabBar";
import HomeTab from "../components/tabs/HomeTab";
import ProductsTab from "../components/tabs/ProductsTab";
import { useTrendingSpot } from "../hooks/useTrendingSpot";
import { useRecommendedSpot } from "../hooks/useRecommendedSpot";
import { useRecentSpot } from "../hooks/useRecentSpot";
import { useSavedSpot } from "../hooks/useSavedSpot";
import { Flame, Sparkles, Clock, Heart } from "lucide-react";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";

export default function SinglePageApp() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab]);

  // Fetch products for each tab
  const trendingHook = useTrendingSpot();
  const recommendedHook = useRecommendedSpot();
  const recentHook = useRecentSpot();
  const savedHook = useSavedSpot();

  // Debug: Log product states
  useEffect(() => {
    console.log("Trending:", {
      products: trendingHook.products?.length ?? "null",
      loading: trendingHook.loading,
    });
    console.log("Recommended:", {
      products: recommendedHook.products?.length ?? "null",
      loading: recommendedHook.loading,
    });
  }, [trendingHook.products, trendingHook.loading, recommendedHook.products, recommendedHook.loading]);

  // Enhanced hooks with infinite scroll
  const trendingProducts = useInfiniteProducts({
    products: trendingHook.products,
    loading: trendingHook.loading,
  });

  const recommendedProducts = useInfiniteProducts({
    products: recommendedHook.products,
    loading: recommendedHook.loading,
  });

  const recentProducts = useInfiniteProducts({
    products: recentHook.products,
    loading: recentHook.loading,
  });

  const savedProducts = useInfiniteProducts({
    products: savedHook.products,
    loading: savedHook.loading,
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab onTabChange={setActiveTab} />;
      case "trending":
        return (
          <ProductsTab
            title="Trending Spot"
            subtitle="Discover what's popular across Shop."
            icon={Flame}
            products={trendingProducts.products}
            loading={trendingProducts.loading}
            onLoadMore={trendingProducts.loadMore}
            hasMore={trendingProducts.hasMore}
          />
        );
      case "recommended":
        return (
          <ProductsTab
            title="Recommended Spot"
            subtitle="Hand-picked for you by Shop."
            icon={Sparkles}
            products={recommendedProducts.products}
            loading={recommendedProducts.loading}
            onLoadMore={recommendedProducts.loadMore}
            hasMore={recommendedProducts.hasMore}
            showPersonalizedBadge={true}
          />
        );
      case "recent":
        return (
          <ProductsTab
            title="Recent Spot"
            subtitle="Pick up where you left off."
            icon={Clock}
            products={recentProducts.products}
            loading={recentProducts.loading}
            onLoadMore={recentProducts.loadMore}
            hasMore={recentProducts.hasMore}
          />
        );
      case "saved":
        return (
          <ProductsTab
            title="Saved Spot"
            subtitle="Your favorites in one place."
            icon={Heart}
            products={savedProducts.products}
            loading={savedProducts.loading}
            onLoadMore={savedProducts.loadMore}
            hasMore={savedProducts.hasMore}
            emptyState={{
              title: "No saved products yet",
              message: "Start exploring and save products you love to see them here.",
              action: {
                label: "Explore Trending Spot",
                onClick: () => setActiveTab("trending"),
              },
            }}
          />
        );
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#B2B0E8]/10"
      style={{
        paddingLeft: "max(env(safe-area-inset-left), 0px)",
        paddingRight: "max(env(safe-area-inset-right), 0px)",
        paddingTop: "max(env(safe-area-inset-top), 0px)",
      }}
    >
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pb-20">
        {renderTabContent()}
      </div>
      <StickyTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
