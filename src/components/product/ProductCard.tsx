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
      className={`overflow-hidden bg-transparent transition-all duration-300 active:scale-[0.97] pb-4 ${className}`}
    >
      <SDKProductCard product={product} />
    </div>
  );
}

