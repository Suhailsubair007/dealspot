import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
  threshold = 200,
}: UseInfiniteScrollOptions) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const currentTarget = observerTarget.current;
    if (!currentTarget) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        try {
          if (entries[0]?.isIntersecting && hasMore && !loading && onLoadMore) {
            onLoadMore();
          }
        } catch (error) {
          console.warn("Error in infinite scroll callback:", error);
        }
      },
      { threshold: 0.1, rootMargin: `${threshold}px` }
    );

    observer.observe(currentTarget);

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, onLoadMore, threshold]);

  return observerTarget;
}
