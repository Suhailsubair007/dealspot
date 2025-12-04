import { useState } from "react";
import Router from "./router";
import SplashScreen from "../components/SplashScreen";
import ErrorBoundary from "../components/common/ErrorBoundary";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ErrorBoundary>
      {showSplash && (
        <div className="fixed inset-0 z-50">
          <SplashScreen onComplete={() => setShowSplash(false)} />
        </div>
      )}
      <div 
        className={showSplash ? "invisible" : "visible transition-opacity duration-300"}
        style={{ 
          willChange: showSplash ? 'opacity' : 'auto',
          opacity: showSplash ? 0 : 1
        }}
      >
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

