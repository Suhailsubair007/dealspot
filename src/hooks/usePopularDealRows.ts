import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@shopify/shop-minis-react";
import { usePopularProducts } from "@shopify/shop-minis-react";
import {
  DEFAULT_PRODUCTS_FETCH_COUNT,
  POPULAR_PRODUCTS_FETCH_POLICY,
} from "../constants";
import type { ProductRow } from "../types/deals";

type FilterProductsFn = (products: Product[]) => Product[];

interface UsePopularDealRowsOptions {
  filterProducts: FilterProductsFn;
}

const dedupeProducts = (products: Product[]): Product[] => {
  const seen = new Set<string>();
  return products.filter((product) => {
    if (seen.has(product.id)) {
      return false;
    }
    seen.add(product.id);
    return true;
  });
};

const createProductRows = (products: Product[]): ProductRow[] => {
  const rows: ProductRow[] = [];

  for (let i = 0; i < products.length; i += 2) {
    const group = products.slice(i, i + 2);
    const fallbackId = `row-${i / 2}`;
    const id =
      group
        .map((product) => product?.id)
        .filter(Boolean)
        .join("-") || fallbackId;

    rows.push({ id, products: group });
  }

  return rows;
};

export const usePopularDealRows = ({
  filterProducts,
}: UsePopularDealRowsOptions) => {
  const { products, loading, fetchMore } = usePopularProducts({
    first: DEFAULT_PRODUCTS_FETCH_COUNT,
    fetchPolicy: POPULAR_PRODUCTS_FETCH_POLICY,
  });

  const hasInitialData = useRef(false);

  useEffect(() => {
    if (products && products.length > 0) {
      hasInitialData.current = true;
    }
  }, [products]);

  const isInitialLoading = loading && !hasInitialData.current;
  const isFetchingMore = loading && hasInitialData.current;
  const [isFetchingMoreVisible, setIsFetchingMoreVisible] = useState(false);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout> | undefined;

    if (isFetchingMore) {
      if (!isFetchingMoreVisible) {
        setIsFetchingMoreVisible(true);
      }
    } else if (isFetchingMoreVisible) {
      hideTimeout = setTimeout(() => setIsFetchingMoreVisible(false), 240);
    }

    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [isFetchingMore, isFetchingMoreVisible]);

  const productPool = useMemo(
    () => dedupeProducts(products ?? []),
    [products]
  );

  const filteredProducts = useMemo(
    () => filterProducts(productPool),
    [filterProducts, productPool]
  );

  const productRows = useMemo(
    () => createProductRows(filteredProducts),
    [filteredProducts]
  );

  return {
    productRows,
    filteredProducts,
    fetchMore,
    isInitialLoading,
    isFetchingMore,
    isFetchingMoreVisible,
  };
};

