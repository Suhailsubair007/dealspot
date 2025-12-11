import type { LucideIcon } from "lucide-react";

interface SpotTileProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export default function SpotTile({
  title,
  description,
  icon: Icon,
  onClick,
}: SpotTileProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-start gap-4 rounded-3xl bg-white px-5 py-6 text-left shadow-sm active:shadow-md active:scale-[0.98] transition-all duration-200 min-h-[140px] w-full active:bg-gradient-to-br active:from-[#B2B0E8]/5 active:to-transparent group"
      style={{ willChange: 'transform' }}
    >
      <div className="p-3 rounded-2xl bg-gradient-to-br from-[#1A2A80] to-[#3B38A0] text-white shadow-sm group-active:shadow-md transition-shadow">
        <Icon className="w-6 h-6" strokeWidth={2} />
      </div>
      <div className="flex-1">
        <p className="text-lg font-semibold text-[#1A2A80] mb-1.5 leading-tight">{title}</p>
        <p className="text-sm text-[#7A85C1] font-normal leading-relaxed">{description}</p>
      </div>
    </button>
  );
}

