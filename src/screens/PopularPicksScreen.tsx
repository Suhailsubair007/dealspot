import {
  List,
  ProductCard,
  Skeleton,
  usePopularProducts,
} from "@shopify/shop-minis-react";
import { Package } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FullScreenHeader from "../components/FullScreenHeader";
import {
  DEAL_SECTION_ICON_MAP,
  DEAL_SECTION_META,
  DEFAULT_PRODUCTS_FETCH_COUNT,
  POPULAR_PRODUCTS_FETCH_POLICY,
} from "../constants";
import {
  discountPercent,
  getRating,
  getReviewCount,
  isDiscounted,
} from "../utils/productUtils";

export default function PopularPicksScreen() {
  const { products: popularProducts, loading, fetchMore } = usePopularProducts({
    first: DEFAULT_PRODUCTS_FETCH_COUNT,
    fetchPolicy: POPULAR_PRODUCTS_FETCH_POLICY,
  });

  // Track if we've had initial data to distinguish initial loading from fetchMore
  const hasInitialData = useRef(false);
  if (popularProducts && popularProducts.length > 0) {
    hasInitialData.current = true;
  }
  const isInitialLoading = loading && !hasInitialData.current;
  const isFetchingMore = loading && hasInitialData.current;
  const [isFetchingMoreVisible, setIsFetchingMoreVisible] = useState(false);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout> | undefined;

    if (isFetchingMore) {
      if (!isFetchingMoreVisible) {
        setIsFetchingMoreVisible(true);
      }
    } else if (isFetchingMoreVisible) {
      hideTimeout = setTimeout(() => setIsFetchingMoreVisible(false), 240);
    }

    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [isFetchingMore, isFetchingMoreVisible]);

  // Deduplicate products by ID
  const productPool = useMemo(() => {
    if (!popularProducts) return [];

    const seen = new Set<string>();
    const deduplicated = popularProducts.filter((product) => {
      if (seen.has(product.id)) {
        return false;
      }
      seen.add(product.id);
      return true;
    });

    return deduplicated;
  }, [popularProducts]);

  // Filter and sort popular products (rating >= 4)
  const popularProductsList = useMemo(() => {
    if (productPool.length === 0) return [];
    return productPool
      .filter((product) => getRating(product) >= 4)
      .sort((a, b) => {
        const ratingDifference = getRating(b) - getRating(a);
        if (ratingDifference !== 0) {
          return ratingDifference;
        }
        return getReviewCount(b) - getReviewCount(a);
      });
  }, [productPool]);

  const sectionMeta = DEAL_SECTION_META.popular;
  const Icon = DEAL_SECTION_ICON_MAP.popular;

  // Stable product rows
  const productRows = useMemo(() => {
    const rows: (typeof popularProductsList)[] = [];

    for (let i = 0; i < popularProductsList.length; i += 2) {
      rows.push(popularProductsList.slice(i, i + 2));
    }

    return rows;
  }, [popularProductsList]);

  // Memoized render function
  const renderRow = useCallback(
    (row: typeof popularProductsList) => (
      <div className="grid grid-cols-2 gap-4 mb-4">
        {row.map((product) => {
          const discount = discountPercent(product);
          const hasDiscount = isDiscounted(product) && discount > 0;

          return (
            <div
              key={product.id}
              className="rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 relative"
            >
              {hasDiscount && (
                <div className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#3E5879] to-[#213555] shadow-lg">
                  <span className="text-xs font-bold text-white">
                    {Math.round(discount)}% OFF
                  </span>
                </div>
              )}
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    ),
    []
  );

  // Skeleton loading rows
  const skeletonRows = useMemo(() => {
    return Array.from({ length: 6 }, () => [null, null]);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#F5EFE7]/10 via-white to-white overflow-hidden">
      <FullScreenHeader
        title={sectionMeta.title}
        subtitle={sectionMeta.subtitle}
        icon={Icon}
      />

      <div className="flex-1 flex flex-col overflow-hidden px-4 pt-4 pb-4">
        {isInitialLoading ? (
          <div className="space-y-4">
            {skeletonRows.map((row, rowIndex) => (
              <div
                key={`skeleton-row-${rowIndex}`}
                className="grid grid-cols-2 gap-4"
              >
                {row.map((_, colIndex) => (
                  <div
                    key={`skeleton-${rowIndex}-${colIndex}`}
                    className="rounded-2xl overflow-hidden shadow-md bg-white"
                  >
                    <div className="flex flex-col">
                      <Skeleton className="w-full aspect-square rounded-t-2xl" />
                      <div className="space-y-2 px-3 py-3">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-5 w-2/3 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : popularProductsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Package
              className="w-16 h-16 text-[#D8C4B6] mb-4"
              strokeWidth={1.5}
            />
            <p className="text-base text-gray-600 font-medium text-center">
              We're loading fresh deals for you. Check back in a moment.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            <List
              items={productRows}
              horizontalDirection={false}
              showScrollbar={false}
              fetchMore={fetchMore}
              height="100%"
              renderItem={renderRow}
            />
            {isFetchingMoreVisible && (
              <div
                className={`grid grid-cols-2 gap-4 mt-4 px-4 transition-all duration-300 flex-shrink-0 ${
                  isFetchingMore
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                {[null, null].map((_, index) => (
                  <div
                    key={`loading-skeleton-${index}`}
                    className="rounded-2xl overflow-hidden shadow-md bg-white"
                  >
                    <div className="flex flex-col">
                      <Skeleton className="w-full aspect-square rounded-t-2xl" />
                      <div className="space-y-2 px-3 py-3">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-5 w-2/3 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

