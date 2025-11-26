import {
  MinisRouter,
  usePopularProducts,
} from "@shopify/shop-minis-react";
import { useState } from "react";
import { Routes, Route } from "react-router";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import TopDealsScreen from "./screens/TopDealsScreen";
import MegaDealsScreen from "./screens/MegaDealsScreen";
import PopularPicksScreen from "./screens/PopularPicksScreen";
import StoreDealsScreen from "./screens/StoreDealsScreen";
import {
  DEFAULT_PRODUCTS_FETCH_COUNT,
  POPULAR_PRODUCTS_FETCH_POLICY,
} from "./constants";

function AppContent() {
  // Lift usePopularProducts to App level for HomeScreen and FullListScreen
  // The new deal screens fetch their own products
  const { products: popularProducts, loading, fetchMore } = usePopularProducts({
    first: DEFAULT_PRODUCTS_FETCH_COUNT,
    fetchPolicy: POPULAR_PRODUCTS_FETCH_POLICY,
  });

  return (
    <MinisRouter viewTransitions>
      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen
              popularProducts={popularProducts}
              loading={loading}
            />
          }
        />
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
