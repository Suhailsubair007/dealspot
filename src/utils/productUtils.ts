import type { Product } from "@shopify/shop-minis-react";
import { PRODUCT_SECTION_ITEM_LIMIT } from "../constants";

const getScale = (amount: string): number => {
  const [, fraction = ""] = amount.split(".");
  return fraction.length;
};

const toScaledInteger = (amount: string, scale: number): bigint => {
  const trimmed = amount.trim();
  const isNegative = trimmed.startsWith("-");
  const unsignedValue = isNegative ? trimmed.slice(1) : trimmed;
  const [wholePart = "0", fractionPart = ""] = unsignedValue.split(".");
  const normalizedFraction =
    fractionPart.length >= scale
      ? fractionPart.slice(0, scale)
      : fractionPart.padEnd(scale, "0");
  const digits = `${wholePart}${normalizedFraction}`.replace(/^$/, "0");
  const bigintValue = BigInt(digits);

  return isNegative ? -bigintValue : bigintValue;
};

const alignAmounts = (
  base: string,
  compare: string
): { baseInt: bigint; compareInt: bigint } => {
  const scale = Math.max(getScale(base), getScale(compare));
  return {
    baseInt: toScaledInteger(base, scale),
    compareInt: toScaledInteger(compare, scale),
  };
};

const compareAmountStrings = (a: string, b: string): number => {
  const { baseInt, compareInt } = alignAmounts(a, b);
  if (baseInt === compareInt) {
    return 0;
  }

  return baseInt > compareInt ? 1 : -1;
};

export const isDiscounted = (product: Product): boolean => {
  if (!product.compareAtPrice) {
    return false;
  }

  return (
    compareAmountStrings(product.compareAtPrice.amount, product.price.amount) >
    0
  );
};

export const discountPercent = (product: Product): number => {
  if (!product.compareAtPrice) {
    return 0;
  }

  const { baseInt: currentPrice, compareInt } = alignAmounts(
    product.price.amount,
    product.compareAtPrice.amount
  );

  if (compareInt <= currentPrice || compareInt === 0n) {
    return 0;
  }

  const discountDifference = compareInt - currentPrice;
  const percentBasisPoints =
    (discountDifference * 10000n + compareInt / 2n) / compareInt;

  return Number(percentBasisPoints) / 100;
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
