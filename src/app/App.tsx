import { useState } from "react";
import MainScreen from "../screens/MainScreen";
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
          <MainScreen />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

