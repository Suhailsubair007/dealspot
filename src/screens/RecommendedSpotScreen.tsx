import { useState, useMemo } from "react";
import ScreenContainer from "../components/layout/ScreenContainer";
import SectionHeader from "../components/layout/SectionHeader";
import ProductGrid from "../components/product/ProductGrid";
import ProductCard from "../components/product/ProductCard";
import SkeletonProductCard from "../components/common/SkeletonProductCard";
import FilterBottomSheet, { type ProductFilters } from "../components/common/FilterBottomSheet";
import { useRecommendedSpot } from "../hooks/useRecommendedSpot";
import { applyProductFilters } from "../utils/filterUtils";
import { Sparkles } from "lucide-react";

export default function RecommendedSpotScreen() {
  const { products, loading } = useRecommendedSpot();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    shops: [],
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
    onSaleOnly: false,
  });

  // Prevent flicker: show skeleton during initial load or when products is null
  const isLoading = loading || products === null;
  
  // Apply filters to products
  const filteredProducts = useMemo(() => {
    return applyProductFilters(products, filters);
  }, [products, filters]);

  const hasProducts = filteredProducts && filteredProducts.length > 0;
  const hasActiveFilters =
    filters.shops.length > 0 ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minRating !== undefined ||
    filters.onSaleOnly === true;

  return (
    <ScreenContainer>
      <SectionHeader
        title="Recommended Spot"
        subtitle="Hand-picked for you by Shop."
        icon={Sparkles}
        showFilterButton={true}
        onFilterClick={() => setFilterOpen(true)}
        hasActiveFilters={hasActiveFilters}
      />
      <div className="px-5 py-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#B2B0E8]/20 to-[#B2B0E8]/10 text-[#3B38A0] text-xs font-semibold backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personalized for you</span>
        </div>
      </div>
      <div className="py-6">
        {isLoading ? (
          <ProductGrid>
            {[...Array(6)].map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </ProductGrid>
        ) : hasProducts ? (
          <ProductGrid>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        ) : (
          <div className="px-5 py-20 text-center">
            <p className="text-[#7A85C1] font-normal">
              {hasActiveFilters
                ? "No products match your filters."
                : "No recommendations available yet."}
            </p>
          </div>
        )}
      </div>
      <FilterBottomSheet
        open={filterOpen}
        onOpenChange={setFilterOpen}
        products={products}
        filters={filters}
        onFiltersChange={setFilters}
        onApply={() => {}}
      />
    </ScreenContainer>
  );
}

