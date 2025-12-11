import { useMemo } from "react";
import { useRecommendedProducts } from "@shopify/shop-minis-react";
import { isDiscounted, sortByDiscountDesc } from "../utils/productUtils";

const RECOMMENDED_DEALS_COUNT = 15;

export const useRecommendedDeals = () => {
  // Note: useRecommendedProducts may not be available in all environments
  // The hook will handle errors gracefully and return empty products if unavailable
  const { products, loading } = useRecommendedProducts({
    first: RECOMMENDED_DEALS_COUNT,
  });

  const recommendedDeals = useMemo(() => {
    if (!products) return [];
    
    // Filter to only show discounted recommended products
    return products
      .filter(isDiscounted)
      .sort(sortByDiscountDesc)
      .slice(0, RECOMMENDED_DEALS_COUNT);
  }, [products]);

  return {
    products: recommendedDeals,
    loading,
  };
};
