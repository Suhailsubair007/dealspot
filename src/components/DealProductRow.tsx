import { ProductCard } from "@shopify/shop-minis-react";
import { discountPercent, isDiscounted } from "../utils/productUtils";
import type { ProductRow } from "../types/deals";

interface DealProductRowProps {
  row: ProductRow;
}

export default function DealProductRow({ row }: DealProductRowProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {row.products.map((product) => {
        if (!product) {
          return null;
        }

        const discount = discountPercent(product);
        const hasDiscount = isDiscounted(product) && discount > 0;

        return (
          <div
            key={product.id}
            className="rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 relative"
          >
            {hasDiscount && (
              <div className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#3E5879] to-[#213555] shadow-lg">
                <span className="text-xs font-bold text-white">
                  {Math.round(discount)}% OFF
                </span>
              </div>
            )}
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
}

