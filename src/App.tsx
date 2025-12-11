import { useState, useRef } from "react";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import SavedScreen from "./screens/SavedScreen";
import TabBar, { TabId } from "./components/TabBar";


export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("");
  const hasCompletedFirstLoad = useRef(false);

  const handleCategoryClick = (categoryQuery: string, categoryName: string) => {
    setSearchQuery(categoryQuery);
    setSearchCategory(categoryName);
    setActiveTab("search");
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSearchCategory("");
  };

  const handleSplashComplete = () => {
    hasCompletedFirstLoad.current = true;
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {/* Always render HomeScreen behind splash to start data fetching in parallel */}
      <div className={`flex flex-col h-screen overflow-hidden transition-opacity duration-300 ${
        showSplash ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="flex-1 min-h-0 overflow-hidden relative">
          {/* Render all screens but control visibility to prevent remounting */}
          <div className="absolute inset-0 overflow-y-auto">
            {activeTab === "home" && (
              <HomeScreen
                onCategoryClick={handleCategoryClick}
                isFirstLoad={!hasCompletedFirstLoad.current}
              />
            )}
            {activeTab === "search" && (
              <SearchScreen
                initialQuery={searchQuery}
                initialCategory={searchCategory}
                onSearchChange={handleSearchChange}
              />
            )}
            {activeTab === "saved" && <SavedScreen />}
          </div>
        </div>
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </>
  );
}
