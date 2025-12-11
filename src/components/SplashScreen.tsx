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

    // Start fade out animation after 2 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);

    // Hide completely after 2.5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(showContentTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#6F4E37] via-[#A67B5B] to-[#ECB176] transition-opacity duration-500 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      style={{
        paddingTop: "max(env(safe-area-inset-top), 0px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 0px)",
        paddingLeft: "max(env(safe-area-inset-left), 0px)",
        paddingRight: "max(env(safe-area-inset-right), 0px)",
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FED8B1]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#ECB176]/20 rounded-full blur-2xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse [animation-delay:0.5s]" />
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
        <div className="mb-6 animate-bounce">
          <div className="p-4 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/25"
            style={{
              boxShadow: "0 8px 32px rgba(111, 78, 55, 0.2)",
            }}
          >
            <Sparkles className="w-10 h-10 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* DealSpot title */}
        <h1 className="text-6xl font-black text-white tracking-tight drop-shadow-lg mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
          DealSpot
        </h1>

        {/* Slogan */}
        <p className="text-lg text-white/95 font-medium tracking-wide mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          Smart Bundles
        </p>
        <p className="text-sm text-white/85 font-normal tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
          Curated discovery experience
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-20 flex items-center gap-2">
        <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce [animation-delay:0s]" />
        <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce [animation-delay:0.2s]" />
        <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
}

