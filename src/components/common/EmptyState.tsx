import { Button } from "@shopify/shop-minis-react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  icon: Icon,
  title,
  message,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#B2B0E8]/20 to-[#B2B0E8]/10 mb-6">
        <Icon className="w-10 h-10 text-[#3B38A0]" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold text-[#1A2A80] mb-3">{title}</h3>
      <p className="text-sm text-[#7A85C1] text-center mb-8 max-w-sm leading-relaxed">
        {message}
      </p>
      {action && (
        <Button
          onClick={action.onClick}
          className="min-h-[48px] px-8 rounded-2xl bg-gradient-to-r from-[#1A2A80] to-[#3B38A0] text-white font-semibold shadow-sm active:shadow-md active:scale-95 transition-all duration-200"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

