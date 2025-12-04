import { usePopularProducts } from "@shopify/shop-minis-react";
import {
  DEFAULT_PRODUCTS_FETCH_COUNT,
  POPULAR_PRODUCTS_FETCH_POLICY,
} from "../constants";

export function useTrendingSpot() {
  return usePopularProducts({
    first: DEFAULT_PRODUCTS_FETCH_COUNT,
    fetchPolicy: POPULAR_PRODUCTS_FETCH_POLICY,
  });
}

