import { MinisRouter } from "@shopify/shop-minis-react";
import { useState } from "react";
import { Routes, Route } from "react-router";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import TopDealsScreen from "./screens/TopDealsScreen";
import MegaDealsScreen from "./screens/MegaDealsScreen";
import PopularPicksScreen from "./screens/PopularPicksScreen";
import StoreDealsScreen from "./screens/StoreDealsScreen";

function AppContent() {
  return (
    <MinisRouter viewTransitions>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/top-deals" element={<TopDealsScreen />} />
        <Route path="/mega-deals" element={<MegaDealsScreen />} />
        <Route path="/popular-picks" element={<PopularPicksScreen />} />
        <Route path="/store-deals" element={<StoreDealsScreen />} />
      </Routes>
    </MinisRouter>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <AppContent />
    </>
  );
}
