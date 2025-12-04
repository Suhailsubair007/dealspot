import type { Product } from "@shopify/shop-minis-react";
import type { ProductFilters } from "../components/common/FilterBottomSheet";

export function applyProductFilters(
  products: Product[] | null,
  filters: ProductFilters
): Product[] {
  if (!products) return [];

  return products.filter((product) => {
    // Shop filter
    if (filters.shops.length > 0) {
      if (!product.shop?.name || !filters.shops.includes(product.shop.name)) {
        return false;
      }
    }

    // Price range filter
    const price = parseFloat(product.price.amount);
    if (isNaN(price)) {
      // If price is invalid and we have price filters, exclude the product
      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        return false;
      }
    } else {
      // Apply min price filter (price must be >= minPrice)
      if (filters.minPrice !== undefined && price < filters.minPrice) {
        return false;
      }
      // Apply max price filter (price must be <= maxPrice)
      if (filters.maxPrice !== undefined && price > filters.maxPrice) {
        return false;
      }
    }

    // Rating filter
    if (filters.minRating !== undefined) {
      const rating = product.reviewAnalytics?.averageRating ?? 0;
      if (rating < filters.minRating) {
        return false;
      }
    }

    // On sale filter
    if (filters.onSaleOnly) {
      if (!product.compareAtPrice) {
        return false;
      }
      const comparePrice = parseFloat(product.compareAtPrice.amount);
      const currentPrice = parseFloat(product.price.amount);
      if (comparePrice <= currentPrice) {
        return false;
      }
    }

    return true;
  });
}

