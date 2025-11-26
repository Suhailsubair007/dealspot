import type { Product } from "@shopify/shop-minis-react";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import DealsListLayout from "../components/DealsListLayout";
import {
  DEAL_SECTION_ICON_MAP,
  DEAL_SECTION_META,
} from "../constants";
import { usePopularDealRows } from "../hooks/usePopularDealRows";

export default function StoreDealsScreen() {
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const storeIdFromParams = searchParams.get("storeId");

  const filterStoreDeals = useCallback(
    (productPool: Product[]) => {
      if (!storeIdFromParams) {
        return [];
      }

      return productPool.filter(
        (product) => product.shop?.id === storeIdFromParams
      );
    },
    [storeIdFromParams]
  );

  const {
    productRows,
    filteredProducts,
    fetchMore,
    isInitialLoading,
    isFetchingMore,
    isFetchingMoreVisible,
  } = usePopularDealRows({ filterProducts: filterStoreDeals });

  const storeName = filteredProducts[0]?.shop?.name;
  const sectionTitle = storeName
    ? `${storeName} Deals`
    : DEAL_SECTION_META.storeDeals.title;
  const subtitle = storeName
    ? `Best of ${storeName}`
    : DEAL_SECTION_META.storeDeals.subtitle;
  const Icon = DEAL_SECTION_ICON_MAP.storeDeals;
  const hasProducts = filteredProducts.length > 0;

  return (
    <DealsListLayout
      title={sectionTitle}
      subtitle={subtitle}
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

