import { useEffect, useState } from "react";
import { Sparkles, ShoppingBag, Tag, TrendingUp } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [iconScale, setIconScale] = useState(0);

  useEffect(() => {
    // Show content after a brief delay
    const showContentTimer = setTimeout(() => {
      setContentVisible(true);
    }, 150);

    // Animate icon scale
    const iconTimer = setTimeout(() => {
      setIconScale(1);
    }, 300);

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
      clearTimeout(iconTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#3E5879] via-[#213555] to-[#3E5879] transition-opacity duration-500 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse [animation-delay:0.5s]" />
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse [animation-delay:1.5s]" />
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-700 ${
          contentVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        {/* Icon container with enhanced animation */}
        <div className="relative mb-6">
          {/* Main icon with scale animation */}
          <div
            className="transition-transform duration-500 ease-out"
            style={{
              transform: `scale(${iconScale})`,
            }}
          >
            <div className="p-4 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
              <Sparkles className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          
          {/* Floating deal icons around main icon */}
          <div className="absolute -top-2 -right-2 animate-bounce [animation-delay:0.3s]">
            <div className="p-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
              <Tag className="w-4 h-4 text-white/90" strokeWidth={2.5} />
            </div>
          </div>
          <div className="absolute -bottom-2 -left-2 animate-bounce [animation-delay:0.6s]">
            <div className="p-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
              <TrendingUp className="w-4 h-4 text-white/90" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* DealSpot title with enhanced styling */}
        <h1 className="text-5xl font-bold text-white tracking-tight drop-shadow-2xl mb-2">
          DealSpot
        </h1>

        {/* Enhanced slogan */}
        <div className="flex items-center gap-2 mb-4 mt-2">
          <div className="h-px w-8 bg-white/40" />
          <p className="text-xs uppercase tracking-widest text-white/80 font-semibold">
            Curated for you
          </p>
          <div className="h-px w-8 bg-white/40" />
        </div>

        <p className="text-base text-white/95 font-medium tracking-wide text-center px-8 leading-relaxed">
          Top Deals, Mega Discounts & Popular Picks
        </p>
        <p className="mt-2 text-sm text-white/85 font-medium tracking-wide">
          All in one place
        </p>

        {/* Decorative elements */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse [animation-delay:0s]" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse [animation-delay:0.2s]" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse [animation-delay:0.4s]" />
          </div>
          <ShoppingBag className="w-4 h-4 text-white/70 animate-pulse" strokeWidth={2} />
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse [animation-delay:0.6s]" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse [animation-delay:0.8s]" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse [animation-delay:1s]" />
          </div>
        </div>
      </div>

      {/* Enhanced loading indicator at bottom */}
      <div className="absolute bottom-16 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce [animation-delay:0s]" />
          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
        <div className="h-px w-24 bg-white/30" />
      </div>
    </div>
  );
}
