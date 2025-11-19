import { Card, ProductCard } from "@shopify/shop-minis-react";
import type { Product } from "@shopify/shop-minis-react";
import ShopAllButton from "./ShopAllButton";

interface SectionScrollerProps {
  title: string;
  products: Product[];
  onShopAll: () => void;
  subtitle?: string;
}

export default function SectionScroller({
  title,
  subtitle,
  products,
  onShopAll,
}: SectionScrollerProps) {
  const hasProducts = products.length > 0;

  return (
    <section className="mb-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {subtitle ? <p className="text-sm text-gray-500">{subtitle}</p> : null}
      </div>

      <Card className="mt-3 rounded-3xl border border-gray-100 bg-white px-3 py-4 shadow-sm">
        {hasProducts ? (
          <div className="flex gap-3 overflow-x-auto pb-2 h-full ">
            {products.map((product) => (
              <div key={product.id} className="w-44 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            Hang tight — we’re loading fresh deals.
          </p>
        )}

        <div className="mt-4">
          <ShopAllButton label="Shop all" onClick={onShopAll} />
        </div>
      </Card>
    </section>
  );
}
