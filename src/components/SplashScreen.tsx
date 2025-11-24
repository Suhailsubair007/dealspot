import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Show content after a brief delay
    const showContentTimer = setTimeout(() => {
      setContentVisible(true);
    }, 100);

    // Start fade out animation after 2.5 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 2500);

    // Hide completely after 3 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(showContentTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#3E5879] via-[#213555] to-[#3E5879] transition-opacity duration-500 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-700 ${
          contentVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        {/* Sparkle icon with animation */}
        <div className="mb-4 animate-bounce">
          <Sparkles className="w-8 h-8 text-white/90" strokeWidth={2.5} />
        </div>

        {/* DealSpot title */}
        <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">
          DealSpot
        </h1>

        {/* Slogan */}
        <p className="mt-3 text-base text-white/90 font-medium tracking-wide">
          Top Deals, Mega Discounts & Popular Picks
        </p>
        <p className="mt-1.5 text-sm text-white/80 font-medium tracking-wide">
          All in one place
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-20 flex items-center gap-2">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  );
}

