import type { Product } from "@shopify/shop-minis-react";
import { useCallback } from "react";
import DealsListLayout from "../components/DealsListLayout";
import {
  DEAL_SECTION_ICON_MAP,
  DEAL_SECTION_META,
} from "../constants";
import { usePopularDealRows } from "../hooks/usePopularDealRows";
import { discountPercent, sortByDiscountDesc } from "../utils/productUtils";

export default function MegaDealsScreen() {
  const filterMegaDeals = useCallback(
    (productPool: Product[]) =>
      productPool
        .filter((product) => discountPercent(product) >= 50)
        .sort(sortByDiscountDesc),
    []
  );

  const {
    productRows,
    filteredProducts,
    fetchMore,
    isInitialLoading,
    isFetchingMore,
    isFetchingMoreVisible,
  } = usePopularDealRows({ filterProducts: filterMegaDeals });

  const sectionMeta = DEAL_SECTION_META.megaDeals;
  const Icon = DEAL_SECTION_ICON_MAP.megaDeals;
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

