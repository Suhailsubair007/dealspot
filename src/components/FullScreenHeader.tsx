import { ArrowLeft } from "lucide-react";
import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import type { LucideIcon } from "lucide-react";

interface FullScreenHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export default function FullScreenHeader({
  title,
  subtitle,
  icon: Icon,
}: FullScreenHeaderProps) {
  const navigate = useNavigateWithTransition();

  return (
    <div className="bg-gradient-to-br from-[#3E5879] via-[#213555] to-[#3E5879] pt-4 pb-4 px-4 rounded-b-2xl shadow-md flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          aria-label="Go back"
          className="p-3 rounded-lg bg-white/10 active:bg-white/20 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center border-0"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
        </button>
        <div className="flex items-center gap-2.5 flex-1">
          <div className="p-1.5 rounded-lg bg-white/15">
            <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white truncate">{title}</h2>
            <p className="text-xs text-white/80 truncate">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

