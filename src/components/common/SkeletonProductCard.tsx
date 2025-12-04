import { Skeleton } from "@shopify/shop-minis-react";

export default function SkeletonProductCard() {
  return (
    <div className="overflow-hidden bg-transparent pb-4">
      <Skeleton className="w-full aspect-square rounded-t-3xl" />
      <div className="space-y-2.5 px-4 py-4">
        <Skeleton className="h-4 w-3/4 rounded-lg" />
        <Skeleton className="h-3 w-1/2 rounded-lg" />
        <Skeleton className="h-5 w-2/3 mt-1 rounded-lg" />
      </div>
    </div>
  );
}

