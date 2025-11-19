import { MinisRouter } from "@shopify/shop-minis-react";
import { Routes, Route } from "react-router";
import HomeScreen from "./screen/HomeScreen";
import FullListScreen from "./screen/FullListScreen";

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
