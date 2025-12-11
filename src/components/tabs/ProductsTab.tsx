import { useState, useMemo, useEffect } from "react";
import ProductGrid from "../product/ProductGrid";
import ProductCard from "../product/ProductCard";
import SkeletonProductCard from "../common/SkeletonProductCard";
import FilterBottomSheet, { type ProductFilters } from "../common/FilterBottomSheet";
import SectionHeader from "../layout/SectionHeader";
import EmptyState from "../common/EmptyState";
import { applyProductFilters } from "../../utils/filterUtils";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import type { LucideIcon } from "lucide-react";
import ErrorBoundary from "../common/ErrorBoundary";

interface ProductsTabProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  products: any[] | null;
  loading: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  showPersonalizedBadge?: boolean;
  emptyState?: {
    title: string;
    message: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
}

export default function ProductsTab({
  title,
  subtitle,
  icon,
  products,
  loading,
  onLoadMore,
  hasMore = false,
  showPersonalizedBadge = false,
  emptyState,
}: ProductsTabProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    shops: [],
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
    onSaleOnly: false,
  });

  // Show loading state if we're loading OR if products is null/undefined (initial state)
  // Empty array [] means loaded but no products, so don't show loading
  const isLoading = loading || products === null || products === undefined;

  const filteredProducts = useMemo(() => {
    return applyProductFilters(products, filters);
  }, [products, filters]);

  // Debug logging
  useEffect(() => {
    console.log(`ProductsTab [${title}]:`, {
      products: products?.length ?? "null",
      loading,
      isLoading,
      hasProducts: filteredProducts?.length > 0,
    });
  }, [title, products, loading, isLoading, filteredProducts]);

  const hasProducts = filteredProducts && filteredProducts.length > 0;
  const hasActiveFilters =
    filters.shops.length > 0 ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minRating !== undefined ||
    filters.onSaleOnly === true;

  const observerTarget = useInfiniteScroll({
    hasMore: hasMore && !hasActiveFilters,
    loading: isLoading,
    onLoadMore: onLoadMore || (() => {}),
  });

  return (
    <ErrorBoundary>
      <div className="pb-8">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          icon={icon}
          showFilterButton={true}
          onFilterClick={() => setFilterOpen(true)}
          hasActiveFilters={hasActiveFilters}
        />
      {showPersonalizedBadge && (
        <div className="px-5 py-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#B2B0E8]/20 to-[#B2B0E8]/10 text-[#3B38A0] text-xs font-semibold backdrop-blur-sm">
            {(() => {
              const Icon = icon;
              return <Icon className="w-3.5 h-3.5" />;
            })()}
            <span>Personalized for you</span>
          </div>
        </div>
      )}
      <div className="py-6">
        {isLoading ? (
          <ProductGrid>
            {[...Array(6)].map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </ProductGrid>
        ) : hasProducts ? (
          <>
            <ProductGrid>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
            {hasMore && !hasActiveFilters && (
              <div ref={observerTarget} className="py-4">
                {loading ? (
                  <ProductGrid>
                    {[...Array(4)].map((_, i) => (
                      <SkeletonProductCard key={`loading-${i}`} />
                    ))}
                  </ProductGrid>
                ) : (
                  <div className="h-20" />
                )}
              </div>
            )}
          </>
        ) : emptyState && !hasActiveFilters ? (
          <EmptyState
            icon={icon}
            title={emptyState.title}
            message={emptyState.message}
            action={emptyState.action}
          />
        ) : (
          <div className="px-5 py-20 text-center">
            <p className="text-[#7A85C1] font-normal">
              {hasActiveFilters
                ? "No products match your filters."
                : `No ${title.toLowerCase()} products found.`}
            </p>
          </div>
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
      </div>
    </ErrorBoundary>
  );
}
