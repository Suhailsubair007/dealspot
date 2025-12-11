import { Home, Flame, Sparkles, Clock, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TabId = "home" | "trending" | "recommended" | "recent" | "saved";

interface Tab {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

const TABS: Tab[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "trending", label: "Trending", icon: Flame },
  { id: "recommended", label: "Recommended", icon: Sparkles },
  { id: "recent", label: "Recent", icon: Clock },
  { id: "saved", label: "Saved", icon: Heart },
];

interface StickyTabBarProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

export default function StickyTabBar({
  activeTab,
  onTabChange,
}: StickyTabBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#B2B0E8]/20 shadow-lg"
      style={{
        paddingBottom: "max(env(safe-area-inset-bottom), 0px)",
        paddingLeft: "max(env(safe-area-inset-left), 0px)",
        paddingRight: "max(env(safe-area-inset-right), 0px)",
      }}
    >
      <div className="flex overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 min-w-0 flex flex-col items-center justify-center gap-1.5 px-3 py-3
                transition-all duration-200 relative
                ${isActive ? "text-[#1A2A80]" : "text-[#7A85C1]"}
                active:scale-95
              `}
              style={{ minHeight: "64px" }}
            >
              <div
                className={`
                  p-2 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-br from-[#1A2A80] to-[#3B38A0] text-white shadow-sm"
                      : "bg-[#B2B0E8]/10 text-[#7A85C1]"
                  }
                `}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <span
                className={`
                  text-xs font-semibold whitespace-nowrap transition-all duration-200
                  ${isActive ? "font-bold" : "font-medium"}
                `}
              >
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A38A0] rounded-b-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { TABS };
export type { Tab };
