import { useState, useEffect } from "react";
import { useProductSearch } from "@shopify/shop-minis-react";
import type { BundleVariation } from "../types/bundles";
import { BUNDLE_PRODUCTS_COUNT } from "../constants";

interface UseBundleBuilderProps {
  keywords: string[];
  variations: number;
}

export function useBundleBuilder({
  keywords,
  variations,
}: UseBundleBuilderProps) {
  const [bundleVariations, setBundleVariations] = useState<BundleVariation[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const { products, isLoading: isSearching } = useProductSearch({
    query: keywords.join(" "),
    first: BUNDLE_PRODUCTS_COUNT * variations,
  });

  useEffect(() => {
    if (!isSearching && products) {
      setIsLoading(false);
      const variationsList: BundleVariation[] = [];

      for (let i = 0; i < variations; i++) {
        const startIndex = i * BUNDLE_PRODUCTS_COUNT;
        const bundleProducts = products.slice(
          startIndex,
          startIndex + BUNDLE_PRODUCTS_COUNT
        );

        if (bundleProducts.length > 0) {
          variationsList.push({
            id: `bundle-${Date.now()}-${i}`,
            name: `Bundle ${i + 1}`,
            products: bundleProducts,
          });
        }
      }

      setBundleVariations(variationsList);
    } else if (isSearching) {
      setIsLoading(true);
    }
  }, [products, isSearching, variations]);

  return {
    bundleVariations,
    isLoading,
    hasBundles: bundleVariations.length > 0,
  };
}

