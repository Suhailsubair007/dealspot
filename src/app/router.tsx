import { MinisRouter } from "@shopify/shop-minis-react";
import { Routes, Route } from "react-router";
import HomeScreen from "../screens/HomeScreen";
import TrendingSpotScreen from "../screens/TrendingSpotScreen";
import RecommendedSpotScreen from "../screens/RecommendedSpotScreen";
import RecentSpotScreen from "../screens/RecentSpotScreen";
import SavedSpotScreen from "../screens/SavedSpotScreen";

export default function Router() {
  return (
    <MinisRouter viewTransitions>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/trending" element={<TrendingSpotScreen />} />
        <Route path="/recommended" element={<RecommendedSpotScreen />} />
        <Route path="/recent" element={<RecentSpotScreen />} />
        <Route path="/saved" element={<SavedSpotScreen />} />
      </Routes>
    </MinisRouter>
  );
}

