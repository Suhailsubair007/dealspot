import type { Product } from "@shopify/shop-minis-react";
import type { ProductFilters } from "../components/common/FilterBottomSheet";

export function applyProductFilters(
  products: Product[] | null,
  filters: ProductFilters
): Product[] {
  if (!products) return [];

  return products.filter((product) => {
    try {
      // Shop filter
      if (filters.shops.length > 0) {
        if (!product.shop?.name || !filters.shops.includes(product.shop.name)) {
          return false;
        }
      }

      // Price range filter - safely check if price exists
      if (!product.price?.amount) {
        // If no price and we have price filters, exclude the product
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
          return false;
        }
      } else {
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
        if (!product.compareAtPrice?.amount || !product.price?.amount) {
          return false;
        }
        const comparePrice = parseFloat(product.compareAtPrice.amount);
        const currentPrice = parseFloat(product.price.amount);
        if (isNaN(comparePrice) || isNaN(currentPrice) || comparePrice <= currentPrice) {
          return false;
        }
      }

      return true;
    } catch (error) {
      // If there's any error processing a product, exclude it
      console.warn("Error filtering product:", error, product);
      return false;
    }
  });
}

