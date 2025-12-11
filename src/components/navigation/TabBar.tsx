import type { TabType } from "../../screens/MainScreen";

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string }[] = [
  { id: "mood", label: "Today's Mood" },
  { id: "activity", label: "Daily Activity" },
  { id: "sports", label: "Sports Bundle" },
  { id: "featured", label: "Featured Bundles" },
];

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div
      className="sticky top-0 z-40 backdrop-blur-2xl border-b border-[#6F4E37]/10"
      style={{
        background: "linear-gradient(180deg, rgba(254, 216, 177, 0.95) 0%, rgba(236, 177, 118, 0.85) 100%)",
        boxShadow: "0 2px 16px rgba(111, 78, 55, 0.08)",
      }}
    >
      <div 
        className="flex gap-2 px-6 py-4 overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative px-5 py-2.5 rounded-2xl font-black text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                isActive
                  ? "text-white"
                  : "text-[#6F4E37]/70 hover:text-[#6F4E37]"
              }`}
              style={{
                background: isActive
                  ? "linear-gradient(135deg, #6F4E37 0%, #A67B5B 50%, #ECB176 100%)"
                  : "transparent",
                boxShadow: isActive
                  ? "0 4px 16px rgba(111, 78, 55, 0.3)"
                  : "none",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

