import { useState, useEffect } from "react";
import { usePopularProducts } from "@shopify/shop-minis-react";
import BundleCard from "../bundle/BundleCard";
import type { BundleVariation } from "../../types/bundles";
import { BUNDLE_PRODUCTS_COUNT, POPULAR_PRODUCTS_FETCH_POLICY } from "../../constants";
import EmptyState from "../common/EmptyState";
import SkeletonProductCard from "../common/SkeletonProductCard";
import { Sparkles, AlertCircle, Package } from "lucide-react";

export default function FeaturedBundlesSection() {
  const [bundleVariations, setBundleVariations] = useState<BundleVariation[]>(
    []
  );
  const [hasError, setHasError] = useState(false);
  
  const result = usePopularProducts({
    first: BUNDLE_PRODUCTS_COUNT * 4,
    fetchPolicy: POPULAR_PRODUCTS_FETCH_POLICY,
  });
  
  // Handle loading property
  const products = result?.products ?? null;
  const isLoading = result?.loading ?? true;

  useEffect(() => {
    if (hasError) {
      return;
    }

    if (!isLoading) {
      try {
        if (products && Array.isArray(products) && products.length > 0) {
          const variations: BundleVariation[] = [];

          for (let i = 0; i < 4; i++) {
            const startIndex = i * BUNDLE_PRODUCTS_COUNT;
            const bundleProducts = products.slice(
              startIndex,
              startIndex + BUNDLE_PRODUCTS_COUNT
            );

            if (bundleProducts.length > 0) {
              variations.push({
                id: `featured-bundle-${Date.now()}-${i}`,
                name: i === 0 ? "⭐ TRENDING NOW" : `Featured Bundle ${i + 1}`,
                products: bundleProducts,
              });
            }
          }

          setBundleVariations(variations);
        } else {
          setBundleVariations([]);
        }
      } catch (error) {
        console.error("Error creating bundle variations:", error);
        setBundleVariations([]);
        setHasError(true);
      }
    }
  }, [products, isLoading, hasError]);

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold leading-none tracking-tight">
          <span className="inline-block bg-gradient-to-r from-[#6F4E37] via-[#A67B5B] to-[#ECB176] bg-clip-text text-transparent">
            Featured Bundles
          </span>
        </h2>
        <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse" />
        <p className="text-xs text-[#6F4E37]/70 font-semibold leading-tight">
          Popular picks
        </p>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl backdrop-blur-xl"
        style={{
          background: "linear-gradient(135deg, rgba(111, 78, 55, 0.1) 0%, rgba(166, 123, 91, 0.1) 100%)",
          boxShadow: "0 4px 16px rgba(111, 78, 55, 0.15)",
        }}
      >
        <Sparkles className="w-4 h-4 text-[#6F4E37]" />
        <p className="text-sm text-[#6F4E37]/80 font-semibold">
          Handpicked bundles from trending products
        </p>
      </div>

      {hasError ? (
        <EmptyState
          icon={AlertCircle}
          title="Unable to load featured bundles"
          message="Please try again later"
        />
      ) : isLoading ? (
        <div className="space-y-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-lg border-2 border-[#B2B0E8]/20"
            >
              <div className="grid grid-cols-2 gap-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="animate-pulse">
                    <SkeletonProductCard />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : bundleVariations.length > 0 ? (
        <div className="space-y-5">
          {bundleVariations.map((variation, index) => (
            <div key={variation.id} className="relative">
              {index === 0 && (
                <div className="absolute -top-2 -right-2 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] text-white text-xs font-black shadow-lg">
                  Featured
                </div>
              )}
              <BundleCard bundleVariation={variation} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Package}
          title="No featured bundles"
          message="Check back later for featured bundles"
        />
      )}
    </div>
  );
}

