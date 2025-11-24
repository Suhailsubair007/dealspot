import { Card, ProductCard, Skeleton } from "@shopify/shop-minis-react";
import type { Product } from "@shopify/shop-minis-react";
import { Package } from "lucide-react";
import ShopAllButton from "./ShopAllButton";
import { DEAL_SECTION_ICON_MAP, DealSectionType } from "../constants";

interface SectionScrollerProps {
  title: string;
  products: Product[];
  onShopAll: () => void;
  subtitle?: string;
  sectionType?: DealSectionType;
  isLoading?: boolean;
}

const getSectionIcon = (title: string, sectionType?: DealSectionType) => {
  if (sectionType) {
    return DEAL_SECTION_ICON_MAP[sectionType];
  }

  const titleLower = title.toLowerCase();
  if (titleLower.includes("top") || titleLower.includes("deal")) {
    return DEAL_SECTION_ICON_MAP.topDeals;
  }
  if (titleLower.includes("mega")) {
    return DEAL_SECTION_ICON_MAP.megaDeals;
  }
  if (titleLower.includes("popular") || titleLower.includes("pick")) {
    return DEAL_SECTION_ICON_MAP.popular;
  }
  if (titleLower.includes("store")) {
    return DEAL_SECTION_ICON_MAP.storeDeals;
  }
  return Package;
};

export default function SectionScroller({
  title,
  subtitle,
  products,
  onShopAll,
  sectionType,
  isLoading = false,
}: SectionScrollerProps) {
  const hasProducts = products.length > 0;
  const Icon = getSectionIcon(title, sectionType);

  return (
    <section className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-[#F5EFE7] to-[#D8C4B6] shadow-md">
          <Icon className="w-5 h-5 text-[#213555]" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {subtitle ? (
            <p className="text-sm text-gray-600 font-medium">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <Card className="mt-2 rounded-3xl border-2 border-[#F5EFE7]/30 bg-gradient-to-br from-white to-[#F5EFE7]/10 px-3 py-5 shadow-xl backdrop-blur-md relative overflow-hidden">
        {isLoading ? (
          <div className="flex gap-4 px-1 overflow-x-auto">
            {[...Array(4)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex-[0_0_70%] min-w-0 rounded-3xl overflow-hidden shadow-lg"
              >
                <div className="flex flex-col bg-white rounded-3xl">
                  <Skeleton className="w-full aspect-square rounded-t-3xl" />
                  <div className="space-y-2 px-3 py-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-5 w-2/3 mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : hasProducts ? (
          <>
            <div className="flex gap-4 px-1 overflow-x-auto snap-x snap-mandatory pb-1">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_70%] min-w-0 rounded-3xl overflow-hidden shadow-lg snap-start"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <Package className="w-12 h-12 text-[#D8C4B6] mb-3" strokeWidth={1.5} />
            <p className="text-sm text-gray-500 font-medium">
              Hang tight — we're loading fresh deals.
            </p>
          </div>
        )}

        <div className="mt-5">
          <ShopAllButton label="Shop all" onClick={onShopAll} />
        </div>
      </Card>
    </section>
  );
}
