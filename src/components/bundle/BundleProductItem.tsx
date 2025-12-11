import { ProductCard as SDKProductCard } from "@shopify/shop-minis-react";
import type { Product } from "@shopify/shop-minis-react";

interface BundleProductItemProps {
  product: Product;
}

export default function BundleProductItem({
  product,
}: BundleProductItemProps) {
  return (
    <div className="relative group">
      <div 
        className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 16px rgba(111, 78, 55, 0.08), 0 1px 4px rgba(111, 78, 55, 0.04)",
        }}
      >
        <SDKProductCard product={product} variant="priceOverlay" />
        <div className="px-3 py-3 bg-gradient-to-b from-transparent to-[#6F4E37]/5">
          <h4 className="text-xs font-bold bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] bg-clip-text text-transparent line-clamp-2 leading-snug tracking-tight">
            {product.title}
          </h4>
        </div>
      </div>
    </div>
  );
}

