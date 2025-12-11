import { useState, useCallback, useEffect } from "react";
import { useAsyncStorage } from "@shopify/shop-minis-react";

const FAVORITES_KEY = "favorites";

export function useFavorites() {
  const asyncStorage = useAsyncStorage();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites on mount
  useEffect(() => {
    asyncStorage.getItem({ key: FAVORITES_KEY }).then((data) => {
      if (data) {
        try {
          const parsed = JSON.parse(data);
          setFavorites(new Set(parsed));
        } catch {
          setFavorites(new Set());
        }
      }
    });
  }, [asyncStorage]);

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.has(productId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (productId: string) => {
      const newFavorites = new Set(favorites);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      setFavorites(newFavorites);
      await asyncStorage.setItem({ key: FAVORITES_KEY, value: JSON.stringify(Array.from(newFavorites)) });
    },
    [favorites, asyncStorage]
  );

  return {
    isFavorite,
    toggleFavorite,
  };
}
