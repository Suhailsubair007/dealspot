import type { Product } from "@shopify/shop-minis-react";
import { PRODUCT_SECTION_ITEM_LIMIT } from "../constants";

export const isDiscounted = (product: Product): boolean => {
  if (!product.compareAtPrice) {
    return false;
  }

  const currentPrice = Number(product.price.amount);
  const comparePrice = Number(product.compareAtPrice.amount);

  return comparePrice > currentPrice;
};

export const discountPercent = (product: Product): number => {
  if (!isDiscounted(product)) {
    return 0;
  }

  const currentPrice = Number(product.price.amount);
  const comparePrice = Number(product.compareAtPrice!.amount);

  const discount = ((comparePrice - currentPrice) / comparePrice) * 100;

  return Number(discount.toFixed(2));
};

export const getRating = (product: Product): number =>
  product.reviewAnalytics?.averageRating ?? 0;

export const getReviewCount = (product: Product): number =>
  product.reviewAnalytics?.reviewCount ?? 0;

export const sortByDiscountDesc = (a: Product, b: Product): number =>
  discountPercent(b) - discountPercent(a);

export const getTopDeals = (products: Product[]): Product[] =>
  products
    .filter(isDiscounted)
    .sort(sortByDiscountDesc)
    .slice(0, PRODUCT_SECTION_ITEM_LIMIT);

export const getMegaDeals = (products: Product[]): Product[] =>
  products
    .filter((product) => discountPercent(product) >= 40)
    .sort(sortByDiscountDesc)
    .slice(0, PRODUCT_SECTION_ITEM_LIMIT);

export const getPopularProducts = (products: Product[]): Product[] =>
  products
    .filter((product) => getRating(product) >= 4)
    .sort((a, b) => {
      const ratingDifference = getRating(b) - getRating(a);

      if (ratingDifference !== 0) {
        return ratingDifference;
      }

      return getReviewCount(b) - getReviewCount(a);
    })
    .slice(0, PRODUCT_SECTION_ITEM_LIMIT);

export const getStoreWiseDeals = (
  products: Product[]
): Record<string, Product[]> =>
  products.reduce<Record<string, Product[]>>((acc, product) => {
    if (!isDiscounted(product)) {
      return acc;
    }

    const shopName = product.shop?.name ?? "Unknown Shop";

    if (!acc[shopName]) {
      acc[shopName] = [];
    }

    acc[shopName].push(product);

    return acc;
  }, {});


