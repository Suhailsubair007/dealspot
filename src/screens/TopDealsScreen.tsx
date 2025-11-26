import type { Product } from "@shopify/shop-minis-react";
import { useCallback } from "react";
import DealsListLayout from "../components/DealsListLayout";
import {
  DEAL_SECTION_ICON_MAP,
  DEAL_SECTION_META,
} from "../constants";
import { usePopularDealRows } from "../hooks/usePopularDealRows";
import { isDiscounted, sortByDiscountDesc } from "../utils/productUtils";

export default function TopDealsScreen() {
  const filterTopDeals = useCallback(
    (productPool: Product[]) =>
      productPool.filter(isDiscounted).sort(sortByDiscountDesc),
    []
  );

  const {
    productRows,
    filteredProducts,
    fetchMore,
    isInitialLoading,
    isFetchingMore,
    isFetchingMoreVisible,
  } = usePopularDealRows({ filterProducts: filterTopDeals });

  const sectionMeta = DEAL_SECTION_META.topDeals;
  const Icon = DEAL_SECTION_ICON_MAP.topDeals;
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

