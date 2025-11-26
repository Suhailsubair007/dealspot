import { List, Skeleton } from "@shopify/shop-minis-react";
import type { LucideIcon } from "lucide-react";
import { Package } from "lucide-react";
import FullScreenHeader from "./FullScreenHeader";
import DealProductRow from "./DealProductRow";
import type { ProductRow } from "../types/deals";

type FetchMoreFn = (() => Promise<void>) | undefined;

interface DealsListLayoutProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  productRows: ProductRow[];
  fetchMore?: FetchMoreFn;
  hasProducts: boolean;
  isInitialLoading: boolean;
  isFetchingMore: boolean;
  isFetchingMoreVisible: boolean;
  emptyStateMessage?: string;
  skeletonRowCount?: number;
}

const DealCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden shadow-md bg-white">
    <div className="flex flex-col">
      <Skeleton className="w-full aspect-square rounded-t-2xl" />
      <div className="space-y-2 px-3 py-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-2/3 mt-1" />
      </div>
    </div>
  </div>
);

const renderSkeletonRow = (rowIndex: number) => (
  <div key={`skeleton-row-${rowIndex}`} className="grid grid-cols-2 gap-4">
    {[0, 1].map((col) => (
      <DealCardSkeleton key={`skeleton-${rowIndex}-${col}`} />
    ))}
  </div>
);

const DealsEmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <Package className="w-16 h-16 text-[#D8C4B6] mb-4" strokeWidth={1.5} />
    <p className="text-base text-gray-600 font-medium text-center">{message}</p>
  </div>
);

export default function DealsListLayout({
  title,
  subtitle,
  icon,
  productRows,
  fetchMore,
  hasProducts,
  isInitialLoading,
  isFetchingMore,
  isFetchingMoreVisible,
  emptyStateMessage = "We're loading fresh deals for you. Check back in a moment.",
  skeletonRowCount = 6,
}: DealsListLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#F5EFE7]/10 via-white to-white overflow-hidden">
      <FullScreenHeader title={title} subtitle={subtitle} icon={icon} />

      <div className="flex-1 flex flex-col overflow-hidden px-4 pt-4 pb-4">
        {isInitialLoading ? (
          <div className="space-y-4">
            {Array.from({ length: skeletonRowCount }).map((_, rowIndex) =>
              renderSkeletonRow(rowIndex)
            )}
          </div>
        ) : !hasProducts ? (
          <DealsEmptyState message={emptyStateMessage} />
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            <List
              items={productRows}
              horizontalDirection={false}
              showScrollbar={false}
              fetchMore={fetchMore}
              height="100%"
              renderItem={(row: ProductRow) => <DealProductRow row={row} />}
            />
            {isFetchingMoreVisible && (
              <div
                className={`grid grid-cols-2 gap-4 mt-4 px-4 transition-all duration-300 flex-shrink-0 ${
                  isFetchingMore
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                {[0, 1].map((index) => (
                  <DealCardSkeleton key={`loading-skeleton-${index}`} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

