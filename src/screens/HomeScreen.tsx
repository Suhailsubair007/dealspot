import { useMemo, memo, useRef, useEffect } from "react";
import type { Product } from "@shopify/shop-minis-react";
import Header from "../components/Header";
import OfferBadge from "../components/OfferBadge";
import { ProductCard, Skeleton } from "@shopify/shop-minis-react";
import { useLatestDeals } from "../hooks/useLatestDeals";
import { useRecommendedDeals } from "../hooks/useRecommendedDeals";
import { useSavedProductsDeals } from "../hooks/useSavedProductsDeals";
import { TrendingUp, Star, Heart, type LucideIcon } from "lucide-react";
import { CATEGORIES } from "../constants/categories";

interface HomeScreenProps {
  onCategoryClick: (query: string, categoryName: string) => void;
  isFirstLoad?: boolean;
}

interface DealSection {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  products: Product[];
  loading: boolean;
}

// Unified Deal Section Component
const DealSection = memo(
  ({
    section,
    index,
    isVisible,
    skipTransition,
  }: {
    section: DealSection;
    index: number;
    isVisible: boolean;
    skipTransition?: boolean;
  }) => {
    const Icon = section.icon;
    const displayProducts = useMemo(
      () => section.products.slice(0, 8),
      [section.products]
    );

    return (
      <section
        className={`mb-6 ${
          skipTransition || isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 transition-all duration-300"
        }`}
        style={{
          transitionDelay: skipTransition || !isVisible ? "0ms" : `${index * 30}ms`,
        }}
      >
        <div className="flex items-center gap-3 mb-4 px-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#3E5879] to-[#213555] shadow-md">
            <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
            <p className="text-sm text-gray-600 font-medium">{section.subtitle}</p>
          </div>
        </div>

        {section.loading && displayProducts.length === 0 ? (
          <div className="px-4">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
              {[...Array(4)].map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="flex-[0_0_48%] min-w-0 rounded-2xl overflow-hidden shadow-lg snap-start relative bg-white"
                  style={{
                    animation: `fadeIn 0.3s ease-out ${idx * 50}ms both`,
                  }}
                >
                  {/* Offer Badge Skeleton - matches absolute positioned badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Skeleton className="h-6 w-16 rounded-lg animate-pulse bg-gradient-to-r from-gray-200 to-gray-300" />
                  </div>
                  
                  {/* Product Card Skeleton - matches exact ProductCard structure */}
                  {/* Image Skeleton - aspect-square matches ProductCard image */}
                  <Skeleton className="w-full aspect-square rounded-t-2xl animate-pulse" />
                  
                  {/* Content Skeleton - matches ProductCard padding (p-3) and content */}
                  <div className="p-3 space-y-2">
                    {/* Product Title Skeleton - typically 2 lines */}
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-full rounded animate-pulse" />
                      <Skeleton className="h-4 w-4/5 rounded animate-pulse" />
                    </div>
                    
                    {/* Price Skeleton - matches price display */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <Skeleton className="h-5 w-20 rounded animate-pulse" />
                      <Skeleton className="h-4 w-16 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : displayProducts.length > 0 ? (
          <div className="px-4">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
              {displayProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_48%] min-w-0 rounded-2xl overflow-hidden shadow-lg snap-start relative transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <OfferBadge product={product} />
                  <div className="p-3">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    );
  }
);

DealSection.displayName = "DealSection";

// Category Card Component
const CategoryCard = memo(
  ({
    category,
    onCategoryClick,
  }: {
    category: (typeof CATEGORIES)[0];
    onCategoryClick: (query: string, name: string) => void;
  }) => {
    const Icon = category.icon;
    return (
      <button
        onClick={() => onCategoryClick(category.searchQuery, category.name)}
        className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-[#F5EFE7]/40 bg-white/70 px-4 py-5 shadow-sm active:shadow-lg transition-all duration-300 min-h-[120px] hover:bg-white/90 active:scale-[0.97]"
      >
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md`}
        >
          <Icon className="w-6 h-6" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold text-gray-900 text-center">
          {category.name}
        </span>
      </button>
    );
  }
);

CategoryCard.displayName = "CategoryCard";

export default function HomeScreen({ onCategoryClick, isFirstLoad = false }: HomeScreenProps) {
  // Track if content has been shown before to prevent flickering on subsequent renders
  const hasShownContentRef = useRef(false);

  // Fetch all deal types - these hooks start fetching immediately
  const latestDeals = useLatestDeals();
  const recommendedDeals = useRecommendedDeals();
  const savedDeals = useSavedProductsDeals();

  // Determine overall loading state
  const isLoading =
    latestDeals.loading ||
    recommendedDeals.loading ||
    savedDeals.loading;

  // Check if we have any data loaded
  const hasAnyData = 
    latestDeals.products.length > 0 ||
    recommendedDeals.products.length > 0 ||
    savedDeals.products.length > 0;

  // Mark content as shown once we have data or are not loading
  useEffect(() => {
    if (hasAnyData || !isLoading) {
      hasShownContentRef.current = true;
    }
  }, [hasAnyData, isLoading]);

  // Skip transitions if:
  // 1. Not first load (navigating back)
  // 2. Content has been shown before (prevents flickering on re-renders)
  const skipTransitions = !isFirstLoad || hasShownContentRef.current;

  // Show content immediately if:
  // 1. Not first load (navigating back) - show immediately, data is cached
  // 2. First load but we have data - show immediately
  // 3. First load and still loading - show skeletons but don't delay
  const shouldShowContent = !isFirstLoad || hasAnyData || !isLoading;

  const dealSections: DealSection[] = useMemo(
    () => [
      {
        id: "latest",
        title: "Latest Deals",
        subtitle: "Fresh price drops just for you",
        icon: TrendingUp,
        products: latestDeals.products,
        loading: latestDeals.loading,
      },
      {
        id: "recommended",
        title: "Recommended Deals",
        subtitle: "Personalized picks based on your interests",
        icon: Star,
        products: recommendedDeals.products,
        loading: recommendedDeals.loading,
      },
      {
        id: "saved",
        title: "Your Saved Deals",
        subtitle: "Deals from your saved products",
        icon: Heart,
        products: savedDeals.products,
        loading: savedDeals.loading,
      },
    ],
    [latestDeals, recommendedDeals, savedDeals]
  );

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#F5EFE7]/5 via-white to-white pb-20 min-h-screen">
      <Header />

      {/* Unified Deal Sections */}
      <div className="mt-6">
        {dealSections.map((section, index) => (
          <DealSection
            key={section.id}
            section={section}
            index={index}
            isVisible={shouldShowContent || section.products.length > 0}
            skipTransition={skipTransitions}
          />
        ))}
      </div>

      {/* Categories Grid */}
      <div
        className={`mt-8 px-4 ${
          skipTransitions || shouldShowContent
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 transition-all duration-300"
        }`}
        style={{
          transitionDelay: skipTransitions || !shouldShowContent ? "0ms" : `${dealSections.length * 50}ms`,
        }}
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onCategoryClick={onCategoryClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
