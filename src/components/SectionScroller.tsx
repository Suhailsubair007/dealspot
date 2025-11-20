import { Card, ProductCard } from "@shopify/shop-minis-react";
import type { Product } from "@shopify/shop-minis-react";
import { TrendingUp, Zap, Star, Store, Package } from "lucide-react";
import ShopAllButton from "./ShopAllButton";

interface SectionScrollerProps {
  title: string;
  products: Product[];
  onShopAll: () => void;
  subtitle?: string;
}

const getSectionIcon = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("top") || titleLower.includes("deal")) {
    return TrendingUp;
  }
  if (titleLower.includes("mega")) {
    return Zap;
  }
  if (titleLower.includes("popular") || titleLower.includes("pick")) {
    return Star;
  }
  if (titleLower.includes("store")) {
    return Store;
  }
  return Package;
};

export default function SectionScroller({
  title,
  subtitle,
  products,
  onShopAll,
}: SectionScrollerProps) {
  const hasProducts = products.length > 0;
  const Icon = getSectionIcon(title);

  return (
    <section className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-[#CCCCFF] to-[#A3A3CC] shadow-md">
          <Icon className="w-5 h-5 text-[#292966]" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {subtitle ? (
            <p className="text-sm text-gray-600 font-medium">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <Card className="mt-2 rounded-3xl border-2 border-[#CCCCFF]/30 bg-gradient-to-br from-white to-[#CCCCFF]/5 px-3 py-4 shadow-lg backdrop-blur-sm">
        {hasProducts ? (
          <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Package className="w-12 h-12 text-[#A3A3CC] mb-3" strokeWidth={1.5} />
            <p className="text-sm text-gray-500 font-medium">
              Hang tight — we're loading fresh deals.
            </p>
          </div>
        )}

        <div className="mt-4">
          <ShopAllButton label="Shop all" onClick={onShopAll} />
        </div>
      </Card>
    </section>
  );
}
