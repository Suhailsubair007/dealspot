import { useState } from "react";
import Router from "./router";
import SplashScreen from "../components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className={showSplash ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-300"}>
        <Router />
      </div>
    </>
  );
}

