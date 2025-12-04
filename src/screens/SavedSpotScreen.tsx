import { useState, useMemo } from "react";
import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import ScreenContainer from "../components/layout/ScreenContainer";
import SectionHeader from "../components/layout/SectionHeader";
import ProductGrid from "../components/product/ProductGrid";
import ProductCard from "../components/product/ProductCard";
import SkeletonProductCard from "../components/common/SkeletonProductCard";
import FilterBottomSheet, { type ProductFilters } from "../components/common/FilterBottomSheet";
import EmptyState from "../components/common/EmptyState";
import { useSavedSpot } from "../hooks/useSavedSpot";
import { applyProductFilters } from "../utils/filterUtils";
import { Heart } from "lucide-react";

export default function SavedSpotScreen() {
  const { products, loading } = useSavedSpot();
  const navigate = useNavigateWithTransition();
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
        title="Saved Spot"
        subtitle="Your favorites in one place."
        icon={Heart}
        showFilterButton={hasProducts}
        onFilterClick={() => setFilterOpen(true)}
        hasActiveFilters={hasActiveFilters}
      />
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
          <EmptyState
            icon={Heart}
            title="No saved products yet"
            message="Start exploring and save products you love to see them here."
            action={{
              label: "Explore Trending Spot",
              onClick: () => navigate("/trending"),
            }}
          />
        )}
      </div>
      {products && products.length > 0 && (
        <FilterBottomSheet
          open={filterOpen}
          onOpenChange={setFilterOpen}
          products={products}
          filters={filters}
          onFiltersChange={setFilters}
          onApply={() => {}}
        />
      )}
    </ScreenContainer>
  );
}

