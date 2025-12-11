import { memo } from "react";
import { discountPercent, isDiscounted } from "../utils/productUtils";
import type { Product } from "@shopify/shop-minis-react";

interface OfferBadgeProps {
  product: Product;
  className?: string;
  position?: "top-left" | "top-right";
}

function OfferBadge({
  product,
  className = "",
  position = "top-left",
}: OfferBadgeProps) {
  const discount = discountPercent(product);
  const hasDiscount = isDiscounted(product) && discount > 0;

  if (!hasDiscount) {
    return null;
  }

  const positionClasses =
    position === "top-right"
      ? "top-4 right-4"
      : "top-4 left-4";

  return (
    <div
      className={`absolute ${positionClasses} z-10 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#3E5879] to-[#213555] shadow-lg ${className}`}
    >
      <span className="text-xs font-bold text-white">
        {Math.round(discount)}% OFF
      </span>
    </div>
  );
}

export default memo(OfferBadge);
