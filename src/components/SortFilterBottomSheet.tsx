import { X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@shopify/shop-minis-react";
import type { SortOption, FilterOption } from "../hooks/useSortFilter";

interface SortFilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  filters: FilterOption;
  onFiltersChange: (filters: FilterOption) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "discount-desc", label: "Highest Discount" },
  { value: "discount-asc", label: "Lowest Discount" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "popularity-desc", label: "Most Popular" },
];

export default function SortFilterBottomSheet({
  isOpen,
  onClose,
  sortBy,
  onSortChange,
  filters,
  onFiltersChange,
  hasActiveFilters,
  onReset,
}: SortFilterBottomSheetProps) {
  if (!isOpen) return null;

  const handleMinDiscountChange = (value: string) => {
    const numValue = value === "" ? undefined : parseInt(value, 10);
    onFiltersChange({
      ...filters,
      minDiscount: numValue,
    });
  };

  const handleMinPriceChange = (value: string) => {
    onFiltersChange({
      ...filters,
      minPrice: value === "" ? undefined : value,
    });
  };

  const handleMaxPriceChange = (value: string) => {
    onFiltersChange({
      ...filters,
      maxPrice: value === "" ? undefined : value,
    });
  };

  const handleMinRatingChange = (value: string) => {
    const numValue = value === "" ? undefined : parseFloat(value);
    onFiltersChange({
      ...filters,
      minRating: numValue,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sort-filter-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#213555]" strokeWidth={2} />
            <h2 id="sort-filter-title" className="text-lg font-bold text-gray-900">
              Sort & Filter
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onReset}
                className="px-3 py-1.5 text-sm font-medium text-[#3E5879] active:bg-gray-100 rounded-lg transition-colors min-h-[48px]"
                aria-label="Reset filters"
              >
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg active:bg-gray-100 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Close sort and filter"
            >
              <X className="w-5 h-5 text-gray-600" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Sort Section */}
          <section aria-labelledby="sort-section-title">
            <div className="flex items-center gap-2 mb-4">
              <ArrowUpDown className="w-4 h-4 text-[#213555]" strokeWidth={2} />
              <h3 id="sort-section-title" className="text-base font-semibold text-gray-900">
                Sort By
              </h3>
            </div>
            <div className="space-y-2">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSortChange(option.value)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 min-h-[48px]
                    ${
                      sortBy === option.value
                        ? "border-[#3E5879] bg-[#3E5879]/5"
                        : "border-gray-200 bg-white active:border-gray-300"
                    }
                  `}
                  aria-pressed={sortBy === option.value}
                >
                  <span
                    className={`font-medium ${
                      sortBy === option.value
                        ? "text-[#213555]"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Filter Section */}
          <section aria-labelledby="filter-section-title">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="w-4 h-4 text-[#213555]" strokeWidth={2} />
              <h3 id="filter-section-title" className="text-base font-semibold text-gray-900">
                Filters
              </h3>
            </div>
            <div className="space-y-4">
              {/* Min Discount */}
              <div>
                <label
                  htmlFor="min-discount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Minimum Discount (%)
                </label>
                <Input
                  id="min-discount"
                  type="number"
                  min="0"
                  max="100"
                  value={filters.minDiscount?.toString() ?? ""}
                  onChange={(e) => handleMinDiscountChange(e.target.value)}
                  placeholder="e.g., 20"
                  aria-label="Minimum discount percentage"
                  className="min-h-[48px]"
                />
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="min-price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Min Price
                  </label>
                  <Input
                    id="min-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={filters.minPrice ?? ""}
                    onChange={(e) => handleMinPriceChange(e.target.value)}
                    placeholder="0.00"
                    aria-label="Minimum price"
                    className="min-h-[48px]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="max-price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Max Price
                  </label>
                  <Input
                    id="max-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={filters.maxPrice ?? ""}
                    onChange={(e) => handleMaxPriceChange(e.target.value)}
                    placeholder="999.99"
                    aria-label="Maximum price"
                    className="min-h-[48px]"
                  />
                </div>
              </div>

              {/* Min Rating */}
              <div>
                <label
                  htmlFor="min-rating"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Minimum Rating
                </label>
                <Input
                  id="min-rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.minRating?.toString() ?? ""}
                  onChange={(e) => handleMinRatingChange(e.target.value)}
                  placeholder="e.g., 4.0"
                  aria-label="Minimum rating"
                  className="min-h-[48px]"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200 flex-shrink-0 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#3E5879] to-[#213555] text-white font-bold text-base shadow-lg active:shadow-xl transition-all duration-300 min-h-[48px]"
            aria-label="Apply filters and close"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

