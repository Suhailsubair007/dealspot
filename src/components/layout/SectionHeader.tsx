import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  showBackButton?: boolean;
  showFilterButton?: boolean;
  onFilterClick?: () => void;
  hasActiveFilters?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  showBackButton = true,
  showFilterButton = false,
  onFilterClick,
  hasActiveFilters = false,
  action,
}: SectionHeaderProps) {
  const navigate = useNavigateWithTransition();

  return (
    <div className="bg-gradient-to-r from-[#1A2A80] to-[#3B38A0] pt-6 pb-5 px-5 rounded-b-3xl shadow-sm flex-shrink-0">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            aria-label="Go back"
            className="p-3 rounded-2xl bg-white/15 active:bg-white/30 transition-all duration-200 min-h-[48px] min-w-[48px] flex items-center justify-center border-0 backdrop-blur-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>
        )}
        {Icon && (
          <div className="p-2 rounded-2xl bg-white/15 backdrop-blur-sm">
            <Icon className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-white truncate leading-tight">{title}</h2>
          {subtitle && (
            <p className="text-sm text-white/90 truncate mt-0.5 leading-relaxed">{subtitle}</p>
          )}
        </div>
        {showFilterButton && onFilterClick && (
          <button
            aria-label="Filter products"
            onClick={onFilterClick}
            className={`relative p-3 rounded-2xl backdrop-blur-sm transition-all duration-200 min-h-[48px] min-w-[48px] flex items-center justify-center border-0 ${
              hasActiveFilters
                ? "bg-white/25 active:bg-white/35"
                : "bg-white/15 active:bg-white/25"
            }`}
          >
            <SlidersHorizontal className="w-5 h-5 text-white" strokeWidth={2.5} />
            {hasActiveFilters && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#facc15] rounded-full" />
            )}
          </button>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="px-5 py-3 rounded-2xl bg-white text-[#1A2A80] font-semibold text-sm active:scale-95 transition-all duration-200 min-h-[48px] shadow-sm active:shadow-md"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}

