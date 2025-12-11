import { useMemo } from "react";
import { usePopularProducts } from "@shopify/shop-minis-react";
import {
  DEFAULT_PRODUCTS_FETCH_COUNT,
  POPULAR_PRODUCTS_FETCH_POLICY,
} from "../constants";
import { isDiscounted, sortByDiscountDesc } from "../utils/productUtils";

const LATEST_DEALS_COUNT = 15;

export const useLatestDeals = () => {
  const { products, loading } = usePopularProducts({
    first: DEFAULT_PRODUCTS_FETCH_COUNT,
    fetchPolicy: POPULAR_PRODUCTS_FETCH_POLICY,
  });

  const latestDeals = useMemo(() => {
    if (!products) return [];
    
    return products
      .filter(isDiscounted)
      .sort(sortByDiscountDesc)
      .slice(0, LATEST_DEALS_COUNT);
  }, [products]);

  return {
    products: latestDeals,
    loading,
  };
};
