import { useState } from "react";
import { BundleProvider } from "../contexts/BundleContext";
import TabBar from "../components/navigation/TabBar";
import MoodSection from "../components/sections/MoodSection";
import ActivitySection from "../components/sections/ActivitySection";
import SportsSection from "../components/sections/SportsSection";
import FeaturedBundlesSection from "../components/sections/FeaturedBundlesSection";

export type TabType = "mood" | "activity" | "sports" | "featured";

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("mood");

  const renderTabContent = () => {
    switch (activeTab) {
      case "mood":
        return <MoodSection />;
      case "activity":
        return <ActivitySection />;
      case "sports":
        return <SportsSection />;
      case "featured":
        return <FeaturedBundlesSection />;
      default:
        return <MoodSection />;
    }
  };

  return (
    <BundleProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#FED8B1] via-[#ECB176] to-[#A67B5B]">
        {/* Main Heading */}
        <div className="px-6 pt-6 pb-3 relative flex-shrink-0">
          <div className="relative flex items-center gap-3">
            <h1 className="text-2xl font-black leading-none tracking-tight">
              <span className="inline-block bg-gradient-to-r from-[#6F4E37] via-[#A67B5B] to-[#ECB176] bg-clip-text text-transparent">
                DealSpot
              </span>
            </h1>
            <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse" />
            <p className="text-xs text-[#6F4E37]/70 font-semibold leading-tight">
              Smart Bundles
            </p>
          </div>
        </div>

        {/* Tab Bar */}
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="pb-8">{renderTabContent()}</div>
      </div>
    </BundleProvider>
  );
}

