import { useState, useEffect, useCallback } from "react";
import type { Product } from "@shopify/shop-minis-react";

interface UseInfiniteProductsOptions {
  products: Product[] | null;
  loading: boolean;
  initialCount?: number;
  loadMoreCount?: number;
}

export function useInfiniteProducts({
  products,
  loading,
  initialCount = 20,
  loadMoreCount = 20,
}: UseInfiniteProductsOptions) {
  const [displayedCount, setDisplayedCount] = useState(initialCount);

  useEffect(() => {
    // Reset displayed count when products change
    if (products === null || products === undefined) {
      // Still loading - don't reset count yet
      return;
    }
    
    if (products.length > 0) {
      // Products loaded - set displayed count
      setDisplayedCount(Math.min(initialCount, products.length));
    } else {
      // Empty array - no products available
      setDisplayedCount(0);
    }
  }, [products, initialCount]);

  const loadMore = useCallback(() => {
    if (products && products.length > 0 && displayedCount < products.length) {
      setDisplayedCount((prev) => Math.min(prev + loadMoreCount, products.length));
    }
  }, [products, displayedCount, loadMoreCount]);

  // Return products based on state
  let displayedProducts: Product[] | null = null;
  if (products === null || products === undefined) {
    // Still loading - return null to indicate loading state
    displayedProducts = null;
  } else if (products.length === 0) {
    // Empty array - no products available (loaded but empty)
    displayedProducts = [];
  } else {
    // Has products - slice them based on displayedCount
    displayedProducts = products.slice(0, displayedCount);
  }

  // hasMore is true only if we have products and haven't shown all of them
  const hasMore = products != null && products.length > 0 && displayedCount < products.length;

  return {
    products: displayedProducts,
    loading,
    hasMore,
    loadMore,
  };
}
