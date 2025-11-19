import { Button } from "@shopify/shop-minis-react";

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
      className="w-full rounded-2xl py-3 text-sm font-semibold"
      variant="secondary"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
