import { useState, useEffect, useMemo, useRef } from "react";
import { useProductSearch, ProductCard, Skeleton } from "@shopify/shop-minis-react";
import type { ProductSearchSortBy, ProductColorFilter } from "@shopify/shop-minis-react";
import { Search, X, Filter } from "lucide-react";
import OfferBadge from "../components/OfferBadge";
import { CATEGORY_ITEMS_COUNT } from "../constants/categories";
import { isDiscounted } from "../utils/productUtils";

interface SearchScreenProps {
  initialQuery?: string;
  initialCategory?: string;
  onSearchChange?: (query: string) => void;
}

export default function SearchScreen({
  initialQuery = "",
  initialCategory = "",
  onSearchChange,
}: SearchScreenProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<ProductSearchSortBy | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({});
  const [colors, setColors] = useState<ProductColorFilter[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const isLoadingMoreRef = useRef(false);
  const hasInitialData = useRef(false);

  // Reset all filters and state when initialQuery changes (coming from category)
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setIsSearching(true);
      // Clear all filters when coming from category
      setSortBy(undefined);
      setPriceRange({});
      setColors([]);
      setMinPrice("");
      setMaxPrice("");
      hasInitialData.current = false;
    }
  }, [initialQuery]);

  // Build filters object
  const filters = useMemo(() => {
    const filterObj: {
      price?: { min?: number; max?: number };
      color?: ProductColorFilter[];
    } = {};

    if (priceRange.min !== undefined || priceRange.max !== undefined) {
      filterObj.price = priceRange;
    }

    if (colors.length > 0) {
      filterObj.color = colors;
    }

    return Object.keys(filterObj).length > 0 ? filterObj : undefined;
  }, [priceRange, colors]);

  const { products, loading, fetchMore } = useProductSearch({
    query: query || "",
    first: CATEGORY_ITEMS_COUNT,
    sortBy: sortBy,
    filters: filters,
  });

  // Reset initial data flag when query, sortBy, or filters change
  // The hook will automatically refetch when these dependencies change
  useEffect(() => {
    hasInitialData.current = false;
  }, [query, sortBy, filters]);

  // Track initial data load
  useEffect(() => {
    if (products && products.length > 0) {
      hasInitialData.current = true;
    }
  }, [products]);

  const isInitialLoading = loading && !hasInitialData.current;
  const isFetchingMore = loading && hasInitialData.current;

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);
    hasInitialData.current = false; // Reset when new search
    onSearchChange?.(searchQuery);
  };

  const handleClear = () => {
    setQuery("");
    setIsSearching(false);
    // Clear all filters when search is cleared
    setSortBy(undefined);
    setPriceRange({});
    setColors([]);
    setMinPrice("");
    setMaxPrice("");
    hasInitialData.current = false;
    onSearchChange?.("");
  };

  const handleApplyPriceRange = () => {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;
    setPriceRange({ min, max });
    hasInitialData.current = false;
    // Refetch will be triggered by useEffect watching priceRange
  };

  const handleClearFilters = () => {
    setSortBy(undefined);
    setPriceRange({});
    setColors([]);
    setMinPrice("");
    setMaxPrice("");
    hasInitialData.current = false;
    // Refetch will be triggered by useEffect watching filters
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (sortBy) count++;
    if (priceRange.min !== undefined || priceRange.max !== undefined) count++;
    if (colors.length > 0) count++;
    return count;
  }, [sortBy, priceRange, colors]);

  const toggleColor = (color: ProductColorFilter) => {
    setColors((prev) => {
      const newColors = prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color];
      hasInitialData.current = false;
      return newColors;
    });
    // Refetch will be triggered by useEffect watching colors
  };

  // Filter products to only show discounted ones
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(isDiscounted);
  }, [products]);

  // Infinite scroll implementation
  useEffect(() => {
    if (!fetchMore || !loadMoreTriggerRef.current || isInitialLoading || !isSearching || !query.trim()) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          !isFetchingMore &&
          !isLoadingMoreRef.current &&
          fetchMore
        ) {
          isLoadingMoreRef.current = true;
          fetchMore()
            .then(() => {
              isLoadingMoreRef.current = false;
            })
            .catch(() => {
              isLoadingMoreRef.current = false;
            });
        }
      },
      {
        root: null,
        rootMargin: "300px", // Start loading 300px before reaching the bottom
        threshold: 0.1,
      }
    );

    const triggerElement = loadMoreTriggerRef.current;
    if (triggerElement) {
      observer.observe(triggerElement);
    }

    return () => {
      if (triggerElement) {
        observer.unobserve(triggerElement);
      }
    };
  }, [fetchMore, isInitialLoading, isFetchingMore, isSearching, query]);

  // Reset loading ref when fetching completes
  useEffect(() => {
    if (!isFetchingMore) {
      isLoadingMoreRef.current = false;
    }
  }, [isFetchingMore]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#F5EFE7]/5 via-white to-white">
      {/* Persistent Search Bar */}
      <div className="sticky top-0 z-30 bg-gradient-to-br from-white via-white to-[#F5EFE7]/10 backdrop-blur-md border-b border-[#F5EFE7]/40 shadow-md px-4 pt-12 pb-5 safe-area-top">
        <div className="flex items-center gap-3 mb-3 pt-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#213555]/60 z-10" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                const newQuery = e.target.value;
                setQuery(newQuery);
                if (newQuery.trim()) {
                  setIsSearching(true);
                  onSearchChange?.(newQuery);
                } else {
                  setIsSearching(false);
                  onSearchChange?.("");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  handleSearch(query.trim());
                }
              }}
              placeholder={initialCategory || "Search products..."}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-[#F5EFE7]/60 bg-white/80 shadow-sm focus:border-[#213555] focus:bg-white focus:outline-none focus:shadow-lg transition-all duration-300 text-base placeholder:text-gray-400"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-[#F5EFE7]/40 active:bg-[#F5EFE7]/60 transition-all duration-200"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
          {isSearching && query && (
            <button
              onClick={() => setShowFilters(true)}
              className="relative flex items-center justify-center w-14 h-14 rounded-2xl border-2 border-[#F5EFE7]/60 bg-gradient-to-br from-white to-[#F5EFE7]/30 shadow-md active:scale-95 active:shadow-sm transition-all duration-200"
              aria-label="Filter products"
            >
              <Filter className="w-5 h-5 text-[#213555]" strokeWidth={2.5} />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-gradient-to-r from-[#3E5879] to-[#213555] text-white text-xs font-bold shadow-lg animate-pulse">
                  {activeFilterCount}
                </span>
              )}
            </button>
          )}
        </div>
        {initialCategory && (
          <div className="flex items-center gap-2 px-1">
            <div className="h-1 w-1 rounded-full bg-[#213555]/40"></div>
            <p className="text-sm text-gray-600">
              Showing results for: <span className="font-semibold text-[#213555]">{initialCategory}</span>
            </p>
          </div>
        )}
      </div>

      {/* Filter Bottom Sheet Drawer */}
      {showFilters && (
        <>
          {/* Backdrop with fade-in animation - covers entire screen including tab bar */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setShowFilters(false)}
            style={{ bottom: 0 }}
          />
          {/* Filter Drawer Panel - Fixed height with organized layout */}
          <div className="fixed bottom-0 left-0 right-0 z-[50] h-[85vh] bg-gradient-to-b from-white via-white to-[#F5EFE7]/5 rounded-t-[2rem] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col animate-[slideUp_0.3s_ease-out]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            {/* Compact Header Section */}
            <div className="flex-shrink-0">
              {/* Drag Handle */}
              <div className="pt-2 pb-1 px-4">
                <div className="w-10 h-1 mx-auto rounded-full bg-gray-300" />
              </div>
              
              {/* Header with Title and Close - Fixed height */}
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-gradient-to-br from-[#3E5879] to-[#213555]">
                      <Filter className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="h-[32px] flex flex-col justify-center">
                      <h2 className="text-sm font-bold text-gray-900 leading-tight">Filters</h2>
                      <span className={`text-[10px] leading-tight transition-opacity ${
                        activeFilterCount > 0 
                          ? "text-gray-500 opacity-100" 
                          : "text-transparent opacity-0"
                      }`}>
                        {activeFilterCount > 0 ? `${activeFilterCount} active` : "0 active"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1.5 rounded-lg active:bg-gray-100 transition-all"
                    aria-label="Close filters"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content Area - Optimized spacing */}
            <div className="flex-1 overflow-y-auto px-4 py-2.5 min-h-0">
              <div className="space-y-2.5">
                {/* Sort By - Compact */}
                <div>
                  <h3 className="text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Sort By</h3>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { value: undefined, label: "Relevance" },
                      { value: "PRICE_LOW_TO_HIGH" as ProductSearchSortBy, label: "Price ↑" },
                      { value: "PRICE_HIGH_TO_LOW" as ProductSearchSortBy, label: "Price ↓" },
                      { value: "MOST_RECENT" as ProductSearchSortBy, label: "Newest" },
                    ].map((option) => (
                      <button
                        key={option.value || "relevance"}
                        onClick={() => {
                          setSortBy(option.value);
                          hasInitialData.current = false;
                        }}
                        className={`px-2.5 py-2 rounded-lg border text-xs font-medium transition-all ${
                          sortBy === option.value
                            ? "border-[#213555] bg-[#213555] text-white shadow-sm"
                            : "border-gray-200 bg-white text-gray-700 active:bg-gray-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range - Compact */}
                <div>
                  <h3 className="text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Price Range</h3>
                  <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="flex-1 relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]">$</span>
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          placeholder="Min"
                          className="w-full pl-5 pr-2 py-1.5 rounded-md border border-gray-200 bg-white focus:border-[#213555] focus:outline-none text-xs transition-all"
                        />
                      </div>
                      <span className="text-gray-400 text-xs">—</span>
                      <div className="flex-1 relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]">$</span>
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          placeholder="Max"
                          className="w-full pl-5 pr-2 py-1.5 rounded-md border border-gray-200 bg-white focus:border-[#213555] focus:outline-none text-xs transition-all"
                        />
                      </div>
                      <button
                        onClick={handleApplyPriceRange}
                        className="px-2.5 py-1.5 rounded-md bg-[#213555] text-white text-[10px] font-semibold active:bg-[#213555]/90 transition-all whitespace-nowrap"
                      >
                        Apply
                      </button>
                    </div>
                    {(priceRange.min !== undefined || priceRange.max !== undefined) && (
                      <button
                        onClick={() => {
                          setPriceRange({});
                          setMinPrice("");
                          setMaxPrice("");
                          hasInitialData.current = false;
                        }}
                        className="w-full text-[10px] text-[#213555] font-medium py-0.5 active:opacity-70"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Colors - Compact Grid */}
                <div>
                  <h3 className="text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Colors</h3>
                  <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                    <div className="grid grid-cols-6 gap-1.5">
                      {([
                        "BLACK",
                        "WHITE",
                        "RED",
                        "BLUE",
                        "GREEN",
                        "YELLOW",
                        "PINK",
                        "PURPLE",
                        "ORANGE",
                        "BROWN",
                        "GREY",
                        "GOLD",
                      ] as ProductColorFilter[]).map((color) => {
                        const isSelected = colors.includes(color);
                        const colorMap: Record<string, string> = {
                          BLACK: "bg-black",
                          WHITE: "bg-white border border-gray-300",
                          RED: "bg-red-500",
                          BLUE: "bg-blue-500",
                          GREEN: "bg-green-500",
                          YELLOW: "bg-yellow-400",
                          PINK: "bg-pink-500",
                          PURPLE: "bg-purple-500",
                          ORANGE: "bg-orange-500",
                          BROWN: "bg-amber-900",
                          GREY: "bg-gray-400",
                          GOLD: "bg-yellow-600",
                        };
                        return (
                          <button
                            key={color}
                            onClick={() => toggleColor(color)}
                            className={`relative aspect-square rounded-lg ${colorMap[color] || "bg-gray-200"} border-2 transition-all ${
                              isSelected ? "border-[#213555] ring-1 ring-[#213555]/50" : "border-transparent"
                            } active:scale-90`}
                            aria-label={`Filter by ${color.toLowerCase()}`}
                          >
                            {isSelected && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-white border border-[#213555]" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {colors.length > 0 && (
                      <button
                        onClick={() => {
                          setColors([]);
                          hasInitialData.current = false;
                        }}
                        className="w-full mt-1.5 text-[10px] text-[#213555] font-medium py-0.5 active:opacity-70"
                      >
                        Clear Colors
                      </button>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Clear All and Apply */}
                <div className="pt-2 space-y-1.5">
                  <button
                    onClick={handleClearFilters}
                    disabled={activeFilterCount === 0}
                    className={`w-full px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                      activeFilterCount > 0
                        ? "border-gray-200 text-gray-700 bg-white active:bg-gray-50"
                        : "border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed"
                    }`}
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#213555] text-white font-semibold active:bg-[#213555]/90 transition-all text-sm"
                  >
                    {activeFilterCount > 0 ? `Apply (${activeFilterCount})` : 'Apply Filters'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-20">
        {isInitialLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="rounded-2xl overflow-hidden shadow-md bg-white animate-pulse"
                style={{
                  animation: `fadeIn 0.3s ease-out ${index * 50}ms both`,
                }}
              >
                <Skeleton className="w-full aspect-square rounded-t-2xl" />
                <div className="space-y-2 px-3 py-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-5 w-2/3 mt-1" />
                </div>
              </div>
            ))}
          </div>
        ) : isSearching && query ? (
          filteredProducts.length > 0 ? (
            <>
              <div className="mb-4 px-1">
                <p className="text-sm text-gray-500">
                  Found <span className="font-semibold text-[#213555]">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'deal' : 'deals'} with offers
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-2xl overflow-hidden shadow-lg bg-white relative transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                  >
                    <OfferBadge product={product} />
                    <div className="p-3">
                      <ProductCard product={product} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Infinite scroll trigger */}
              <div ref={loadMoreTriggerRef} className="h-4 w-full mt-4" />

              {/* Loading more skeleton */}
              {isFetchingMore && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[0, 1].map((index) => (
                    <div
                      key={`loading-skeleton-${index}`}
                      className="rounded-2xl overflow-hidden shadow-md bg-white animate-pulse"
                    >
                      <Skeleton className="w-full aspect-square rounded-t-2xl" />
                      <div className="space-y-2 px-3 py-3">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-5 w-2/3 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="p-4 rounded-full bg-[#F5EFE7]/30 mb-4">
                <Search className="w-12 h-12 text-[#D8C4B6]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No deals found</h3>
              <p className="text-base text-gray-600 font-medium text-center max-w-xs">
                We couldn't find any products with offers matching "{query}". Try different keywords or browse categories.
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-[#F5EFE7] to-[#D8C4B6] mb-4 shadow-md">
              <Search className="w-12 h-12 text-[#213555]" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Start searching</h3>
            <p className="text-base text-gray-600 font-medium text-center max-w-xs">
              Type in the search bar above to find products with deals, or tap a category from Home to browse.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
