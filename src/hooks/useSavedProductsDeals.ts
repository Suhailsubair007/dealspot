import { useMemo } from "react";
import { useSavedProducts } from "@shopify/shop-minis-react";
import { isDiscounted, sortByDiscountDesc } from "../utils/productUtils";

const SAVED_DEALS_COUNT = 15;

export const useSavedProductsDeals = () => {
  const { products, loading } = useSavedProducts({
    first: SAVED_DEALS_COUNT,
  });

  const savedDeals = useMemo(() => {
    if (!products) return [];
    
    // Filter to only show discounted saved products
    return products
      .filter(isDiscounted)
      .sort(sortByDiscountDesc)
      .slice(0, SAVED_DEALS_COUNT);
  }, [products]);

  return {
    products: savedDeals,
    loading,
  };
};
