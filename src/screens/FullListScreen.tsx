import {
  List,
  ProductCard,
  Skeleton,
  useNavigateWithTransition,
  usePopularProducts,
} from "@shopify/shop-minis-react";
import { ArrowLeft, Package } from "lucide-react";
import { useCallback, useMemo, useRef } from "react";
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
  DEFAULT_PRODUCTS_FETCH_COUNT,
  DEFAULT_SECTION_TYPE,
  FULL_LIST_LIST_HEIGHT,
  POPULAR_PRODUCTS_FETCH_POLICY,
  SECTION_ORDER,
  DealSectionType,
} from "../constants";

const isValidSectionType = (value: string | null): value is DealSectionType =>
  !!value && (SECTION_ORDER as string[]).includes(value);

export default function FullListScreen() {
  const {
    products: popularProducts,
    loading,
    fetchMore,
  } = usePopularProducts({
    first: DEFAULT_PRODUCTS_FETCH_COUNT,
    fetchPolicy: POPULAR_PRODUCTS_FETCH_POLICY,
  });
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
        {row.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    ),
    []
  );

  // Skeleton loading rows
  const skeletonRows = useMemo(() => {
    return Array.from({ length: 6 }, () => [null, null]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE7]/10 via-white to-white">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-br from-[#3E5879] via-[#213555] to-[#3E5879] pt-6 pb-8 px-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <button
            className="p-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 hover:bg-white/25 transition-all duration-200 flex items-center gap-2 text-white font-semibold"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            Back
          </button>
          <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-semibold text-white tracking-wide border border-white/30">
            DealSpot
          </span>
        </div>
        <div className="mt-4 flex items-center gap-4 rounded-3xl bg-white/15 border border-white/30 px-4 py-3 backdrop-blur-sm shadow-lg">
          <div className="p-3 rounded-2xl bg-white/25 border border-white/40">
            <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm text-white/80 uppercase tracking-[0.2em] font-semibold">
              Curated list
            </p>
            <h2 className="text-2xl font-bold text-white leading-tight">
              {sectionTitle}
            </h2>
            <p className="text-sm text-white/90 font-medium mt-1">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6 pt-6">
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
          <>
            <List
              items={productRows}
              horizontalDirection={false}
              showScrollbar={false}
              fetchMore={fetchMore}
              height={FULL_LIST_LIST_HEIGHT}
              renderItem={renderRow}
            />
            {/* Show loading skeleton at bottom when fetching more - with smooth transition */}
            {isFetchingMore && (
              <div className="grid grid-cols-2 gap-4 mt-4 opacity-100 transition-opacity duration-300">
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
          </>
        )}
      </div>
    </div>
  );
}
