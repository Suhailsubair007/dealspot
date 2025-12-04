import { ProductCard as SDKProductCard } from "@shopify/shop-minis-react";
import type { Product } from "@shopify/shop-minis-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  return (
    <div
      className={`overflow-hidden bg-transparent transition-all duration-300 active:scale-[0.97] ${className}`}
    >
      <SDKProductCard product={product} variant="priceOverlay" />
      <div className="px-4 py-4">
        <h3 className="text-sm font-semibold text-[#1A2A80] line-clamp-2 leading-snug tracking-tight">
          {product.title}
        </h3>
      </div>
    </div>
  );
}
