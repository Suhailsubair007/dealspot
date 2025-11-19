import { MinisRouter } from "@shopify/shop-minis-react";
import { Routes, Route } from "react-router";
import HomeScreen from "./screens/HomeScreen";
import FullListScreen from "./screens/FullListScreen";

export default function App() {
  return (
    <MinisRouter viewTransitions>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/full-list" element={<FullListScreen />} />
      </Routes>
    </MinisRouter>
  );
}
