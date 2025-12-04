import { useRecommendedProducts } from "@shopify/shop-minis-react";
import {
  DEFAULT_PRODUCTS_FETCH_COUNT,
  POPULAR_PRODUCTS_FETCH_POLICY,
} from "../constants";

export function useRecommendedSpot() {
  return useRecommendedProducts({
    first: DEFAULT_PRODUCTS_FETCH_COUNT,
    fetchPolicy: POPULAR_PRODUCTS_FETCH_POLICY,
  });
}

