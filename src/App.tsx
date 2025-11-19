import { MinisRouter } from "@shopify/shop-minis-react";
import { Routes, Route } from "react-router";
import HomeScreen from "./screen/HomeScreen";

export default function App() {
  return (
    <MinisRouter viewTransitions>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </MinisRouter>
  );
}
