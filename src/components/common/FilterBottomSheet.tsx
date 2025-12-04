import { useMemo } from "react";
import { Button } from "@shopify/shop-minis-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@shopify/shop-minis-react";
import type { Product } from "@shopify/shop-minis-react";

export interface ProductFilters {
  shops: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  onSaleOnly?: boolean;
}

interface FilterBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[] | null;
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onApply: () => void;
}

export default function FilterBottomSheet({
  open,
  onOpenChange,
  products,
  filters,
  onFiltersChange,
  onApply,
}: FilterBottomSheetProps) {
  // Extract unique shops from products
  const availableShops = useMemo(() => {
    if (!products) return [];
    const shops = new Set<string>();
    products.forEach((product) => {
      if (product.shop?.name) {
        shops.add(product.shop.name);
      }
    });
    return Array.from(shops).sort();
  }, [products]);

  // Extract price range from products
  const priceRange = useMemo(() => {
    if (!products || products.length === 0) return { min: 0, max: 0 };
    const prices = products
      .map((p) => parseFloat(p.price.amount))
      .filter((p) => !isNaN(p));
    if (prices.length === 0) return { min: 0, max: 0 };
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  const handleShopToggle = (shopName: string) => {
    const newShops = filters.shops.includes(shopName)
      ? filters.shops.filter((s) => s !== shopName)
      : [...filters.shops, shopName];
    onFiltersChange({ ...filters, shops: newShops });
  };

  const handleClearAll = () => {
    onFiltersChange({
      shops: [],
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      onSaleOnly: false,
    });
  };

  const hasActiveFilters =
    filters.shops.length > 0 ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minRating !== undefined ||
    filters.onSaleOnly === true;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent 
        direction="bottom" 
        className="max-h-[85vh]"
        style={{
          willChange: open ? 'transform' : 'auto',
        }}
      >
        <DrawerHeader className="pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-semibold text-[#1A2A80]">
              Filter Products
            </DrawerTitle>
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="text-sm text-[#7A85C1] font-medium active:text-[#3B38A0] min-h-[44px] px-2"
              >
                Clear all
              </button>
            )}
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          {/* Shop Filter */}
          {availableShops.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-[#1A2A80] mb-3">
                Shop
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableShops.map((shop) => (
                  <button
                    key={shop}
                    onClick={() => handleShopToggle(shop)}
                    className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 min-h-[48px] ${
                      filters.shops.includes(shop)
                        ? "bg-gradient-to-r from-[#1A2A80] to-[#3B38A0] text-white shadow-sm"
                        : "bg-gray-100 text-[#7A85C1] active:bg-gray-200"
                    }`}
                  >
                    {shop}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Filter */}
          {priceRange.max > 0 && (
            <div>
              <h3 className="text-base font-semibold text-[#1A2A80] mb-3">
                Price Range
              </h3>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-[#7A85C1] mb-1.5 block">
                    Min Price
                  </label>
                  <input
                    type="number"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={filters.minPrice ?? ""}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      if (value === "") {
                        onFiltersChange({
                          ...filters,
                          minPrice: undefined,
                        });
                      } else {
                        const parsed = parseFloat(value);
                        if (!isNaN(parsed) && parsed >= 0) {
                          onFiltersChange({
                            ...filters,
                            minPrice: parsed,
                          });
                        }
                      }
                    }}
                    placeholder={`${priceRange.min}`}
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-[#1A2A80] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B38A0]/20 focus:border-[#3B38A0] min-h-[48px]"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-[#7A85C1] mb-1.5 block">
                    Max Price
                  </label>
                  <input
                    type="number"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={filters.maxPrice ?? ""}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      if (value === "") {
                        onFiltersChange({
                          ...filters,
                          maxPrice: undefined,
                        });
                      } else {
                        const parsed = parseFloat(value);
                        if (!isNaN(parsed) && parsed >= 0) {
                          onFiltersChange({
                            ...filters,
                            maxPrice: parsed,
                          });
                        }
                      }
                    }}
                    placeholder={`${priceRange.max}`}
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-[#1A2A80] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B38A0]/20 focus:border-[#3B38A0] min-h-[48px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Rating Filter */}
          <div>
            <h3 className="text-base font-semibold text-[#1A2A80] mb-3">
              Minimum Rating
            </h3>
            <div className="flex gap-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      minRating:
                        filters.minRating === rating ? undefined : rating,
                    })
                  }
                  className={`flex-1 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 min-h-[48px] ${
                    filters.minRating === rating
                      ? "bg-gradient-to-r from-[#1A2A80] to-[#3B38A0] text-white shadow-sm"
                      : "bg-gray-100 text-[#7A85C1] active:bg-gray-200"
                  }`}
                >
                  {rating}+ ⭐
                </button>
              ))}
            </div>
          </div>

          {/* On Sale Filter */}
          <div>
            <h3 className="text-base font-semibold text-[#1A2A80] mb-3">
              Special Offers
            </h3>
            <button
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  onSaleOnly: !filters.onSaleOnly,
                })
              }
              className={`w-full px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 min-h-[48px] text-left ${
                filters.onSaleOnly
                  ? "bg-gradient-to-r from-[#1A2A80] to-[#3B38A0] text-white shadow-sm"
                  : "bg-gray-100 text-[#7A85C1] active:bg-gray-200"
              }`}
            >
              Show only products on sale
            </button>
          </div>
        </div>

        <DrawerFooter className="border-t border-gray-200 pt-4">
          <div className="flex gap-3 w-full">
            <Button
              onClick={() => onOpenChange(false)}
              className="flex-1 min-h-[48px] bg-gray-100 text-[#7A85C1] font-semibold active:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onApply();
                onOpenChange(false);
              }}
              className="flex-1 min-h-[48px] bg-gradient-to-r from-[#1A2A80] to-[#3B38A0] text-white font-semibold active:from-[#3B38A0] active:to-[#7A85C1]"
            >
              Apply Filters
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

