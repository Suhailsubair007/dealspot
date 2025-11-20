import { Button } from "@shopify/shop-minis-react";
import { ArrowRight } from "lucide-react";
import { SHOP_ALL_BUTTON_CLASSNAME } from "../constants";

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
      className={SHOP_ALL_BUTTON_CLASSNAME}
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
