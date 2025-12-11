import type { LucideIcon } from "lucide-react";
import { Home, Search, Heart } from "lucide-react";

export type TabId = "home" | "search" | "saved";

interface TabConfig {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

export const TAB_CONFIG: TabConfig[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
  },
  {
    id: "saved",
    label: "Saved",
    icon: Heart,
  },
];

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F5EFE7]/40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] safe-area-bottom">
      <div className="grid grid-cols-3 gap-0.5 px-1 py-1.5">
        {TAB_CONFIG.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-lg transition-all duration-300 min-h-[56px] relative ${
                isActive
                  ? "text-[#213555]"
                  : "text-gray-500 active:bg-gray-50/50"
              }`}
              aria-label={tab.label}
            >
              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-[#3E5879] to-[#213555] animate-pulse" />
              )}
              
              <div
                className={`p-1.5 pb-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-[#3E5879]/10 to-[#213555]/10 scale-110"
                    : "scale-100"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-all duration-300 ${
                    isActive ? "text-[#213555]" : "text-gray-500"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              
              <span
                className={`text-[10px] font-semibold leading-tight transition-all duration-300 ${
                  isActive
                    ? "text-[#213555] scale-105"
                    : "text-gray-500 scale-100"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
