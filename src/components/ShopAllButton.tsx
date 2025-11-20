import { Button } from "@shopify/shop-minis-react";
import { ArrowRight } from "lucide-react";

interface ShopAllButtonProps {
  onClick: () => void;
  label?: string;
}

export default function ShopAllButton({
  onClick,
  label = "Shop all",
}: ShopAllButtonProps) {
  return (
    <Button
      className="w-full rounded-2xl py-3.5 text-sm font-bold bg-gradient-to-r from-[#5C5C99] to-[#292966] text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
      variant="secondary"
      onClick={onClick}
    >
      <span className="flex items-center justify-center gap-2">
        {label}
        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
      </span>
    </Button>
  );
}
