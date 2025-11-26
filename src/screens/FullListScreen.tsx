import {
  List,
  ProductCard,
  Skeleton,
  useNavigateWithTransition,
} from "@shopify/shop-minis-react";
import type { Product } from "@shopify/shop-minis-react";
import { ArrowLeft, Package } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import {
  discountPercent,
  getRating,
  getReviewCount,
  getStoreWiseDeals,
  isDiscounted,
  sortByDiscountDesc,
} from "../utils/productUtils";
import {
  DEAL_SECTION_ICON_MAP,
  DEAL_SECTION_META,
  DEFAULT_SECTION_TYPE,
  SECTION_ORDER,
  DealSectionType,
} from "../constants";

const isValidSectionType = (value: string | null): value is DealSectionType =>
  !!value && (SECTION_ORDER as string[]).includes(value);

interface FullListScreenProps {
  popularProducts: Product[] | null | undefined;
  loading: boolean;
  fetchMore: (() => Promise<void>) | undefined;
}

export default function FullListScreen({
  popularProducts,
  loading,
  fetchMore,
}: FullListScreenProps) {
  const navigate = useNavigateWithTransition();
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const type = isValidSectionType(searchParams.get("type"))
    ? (searchParams.get("type") as DealSectionType)
    : DEFAULT_SECTION_TYPE;
  const storeFromParams = searchParams.get("store");

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

  // Deduplicate products by ID to prevent duplicates when fetchMore is used
  // Use stable reference to prevent unnecessary re-renders
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

  // Memoize storeWise with stable reference
  const storeWise = useMemo(() => {
    if (productPool.length === 0) return {};
    return getStoreWiseDeals(productPool);
  }, [productPool]);

  // Memoize derived products with stable reference - only recalculate when dependencies actually change
  const derivedProducts = useMemo(() => {
    if (productPool.length === 0) return [];

    switch (type) {
      case "megaDeals": {
        // For full list, show all mega deals, not just limited ones
        return productPool
          .filter((product) => discountPercent(product) >= 40)
          .sort(sortByDiscountDesc);
      }
      case "popular": {
        // For full list, show all popular products, not just limited ones
        return productPool
          .filter((product) => getRating(product) >= 4)
          .sort((a, b) => {
            const ratingDifference = getRating(b) - getRating(a);
            if (ratingDifference !== 0) {
              return ratingDifference;
            }
            return getReviewCount(b) - getReviewCount(a);
          });
      }
      case "storeDeals":
        if (storeFromParams) {
          return storeWise[storeFromParams] ?? [];
        }
        return Object.values(storeWise).flat();
      case "topDeals":
      default: {
        // For full list, show all discounted products, not just limited ones
        return productPool.filter(isDiscounted).sort(sortByDiscountDesc);
      }
    }
  }, [productPool, storeWise, storeFromParams, type]);

  const sectionTitle =
    type === "storeDeals" && storeFromParams
      ? `${storeFromParams} Deals`
      : DEAL_SECTION_META[type].title;

  const subtitle =
    type === "storeDeals" && storeFromParams
      ? `Best of ${storeFromParams}`
      : DEAL_SECTION_META[type].subtitle;

  const Icon = DEAL_SECTION_ICON_MAP[type];

  // Stable product rows - only recalculate when derivedProducts actually changes
  const productRows = useMemo(() => {
    const rows: (typeof derivedProducts)[] = [];

    for (let i = 0; i < derivedProducts.length; i += 2) {
      rows.push(derivedProducts.slice(i, i + 2));
    }

    return rows;
  }, [derivedProducts]);

  // Memoized render function to prevent List re-renders
  const renderRow = useCallback(
    (row: typeof derivedProducts) => (
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
      {/* Simplified Header Section */}
      <div className="bg-gradient-to-br from-[#3E5879] via-[#213555] to-[#3E5879] pt-4 pb-4 px-4 rounded-b-2xl shadow-md flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            className="p-3 rounded-lg bg-white/10 active:bg-white/20 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <div className="flex items-center gap-2.5 flex-1">
            <div className="p-1.5 rounded-lg bg-white/15">
              <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-white truncate">
                {sectionTitle}
              </h2>
              <p className="text-xs text-white/80 truncate">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden px-4 pt-4 pb-4">
        {isInitialLoading ? (
          // Initial loading state with skeletons
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
        ) : derivedProducts.length === 0 ? (
          // Empty state
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
            {/* Show loading skeleton at bottom when fetching more - with smooth transition */}
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
