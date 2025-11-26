import {
  MinisRouter,
  usePopularProducts,
} from "@shopify/shop-minis-react";
import { useState } from "react";
import { Routes, Route } from "react-router";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import FullListScreen from "./screens/FullListScreen";
import {
  DEFAULT_PRODUCTS_FETCH_COUNT,
  POPULAR_PRODUCTS_FETCH_POLICY,
} from "./constants";

function AppContent() {
  // Lift usePopularProducts to App level to prevent duplicate API calls
  // This ensures both HomeScreen and FullListScreen share the same data
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
        <Route
          path="/full-list"
          element={
            <FullListScreen
              popularProducts={popularProducts}
              loading={loading}
              fetchMore={fetchMore}
            />
          }
        />
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
