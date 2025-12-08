import { Skeleton } from "@shopify/shop-minis-react";

interface SkeletonGridProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export default function SkeletonGrid({
  rows = 6,
  columns = 2,
  className = "",
}: SkeletonGridProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`skeleton-row-${rowIndex}`}
          className={`grid gap-4 ${
            columns === 2 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={`skeleton-${rowIndex}-${colIndex}`}
              className="rounded-2xl overflow-hidden shadow-md bg-white"
            >
              <div className="flex flex-col">
                <Skeleton className="w-full aspect-square rounded-t-2xl" />
                <div className="space-y-2 px-3 py-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-5 w-2/3 mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

