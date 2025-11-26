import type { Product } from "@shopify/shop-minis-react";
import { useCallback } from "react";
import DealsListLayout from "../components/DealsListLayout";
import {
  DEAL_SECTION_ICON_MAP,
  DEAL_SECTION_META,
} from "../constants";
import { usePopularDealRows } from "../hooks/usePopularDealRows";
import { getRating, getReviewCount } from "../utils/productUtils";

export default function PopularPicksScreen() {
  const filterPopularPicks = useCallback(
    (productPool: Product[]) =>
      productPool
        .filter((product) => getRating(product) >= 4)
        .sort((a, b) => {
          const ratingDifference = getRating(b) - getRating(a);
          if (ratingDifference !== 0) {
            return ratingDifference;
          }
          return getReviewCount(b) - getReviewCount(a);
        }),
    []
  );

  const {
    productRows,
    filteredProducts,
    fetchMore,
    isInitialLoading,
    isFetchingMore,
    isFetchingMoreVisible,
  } = usePopularDealRows({ filterProducts: filterPopularPicks });

  const sectionMeta = DEAL_SECTION_META.popular;
  const Icon = DEAL_SECTION_ICON_MAP.popular;
  const hasProducts = filteredProducts.length > 0;

  return (
    <DealsListLayout
      title={sectionMeta.title}
      subtitle={sectionMeta.subtitle}
      icon={Icon}
      productRows={productRows}
      fetchMore={fetchMore}
      hasProducts={hasProducts}
      isInitialLoading={isInitialLoading}
      isFetchingMore={isFetchingMore}
      isFetchingMoreVisible={isFetchingMoreVisible}
    />
  );
}

