import { MinisRouter } from "@shopify/shop-minis-react";
import { useState } from "react";
import { Routes, Route } from "react-router";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import FullListScreen from "./screens/FullListScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <MinisRouter viewTransitions>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/full-list" element={<FullListScreen />} />
        </Routes>
      </MinisRouter>
    </>
  );
}
