import { useState, useCallback } from "react";
import { useShopNavigation } from "@shopify/shop-minis-react";
import type { Product } from "@shopify/shop-minis-react";
import type { Bundle } from "../types/bundles";

export function useBundleManager() {
  const { navigateToProduct } = useShopNavigation();
  const [bundles, setBundles] = useState<Bundle[]>([]);

  const removeProductFromBundle = useCallback(
    (bundleId: string, productId: string) => {
      setBundles((prev) =>
        prev.map((bundle) =>
          bundle.id === bundleId
            ? {
                ...bundle,
                products: bundle.products.filter((p) => p.id !== productId),
              }
            : bundle
        )
      );
    },
    []
  );

  const replaceProductInBundle = useCallback(
    (bundleId: string, oldProductId: string, newProduct: Product) => {
      setBundles((prev) =>
        prev.map((bundle) =>
          bundle.id === bundleId
            ? {
                ...bundle,
                products: bundle.products.map((p) =>
                  p.id === oldProductId ? newProduct : p
                ),
              }
            : bundle
        )
      );
    },
    []
  );

  const viewProductDetails = useCallback(
    (productId: string) => {
      navigateToProduct(productId);
    },
    [navigateToProduct]
  );

  return {
    bundles,
    setBundles,
    removeProductFromBundle,
    replaceProductInBundle,
    viewProductDetails,
  };
}

