import { useState } from "react";
import type { MoodType } from "../../types/bundles";
import { MOOD_CONFIGS } from "../../constants";
import MoodSelector from "../bundle/MoodSelector";
import BundleCard from "../bundle/BundleCard";
import { useBundleBuilder } from "../../hooks/useBundleBuilder";
import EmptyState from "../common/EmptyState";
import SkeletonProductCard from "../common/SkeletonProductCard";

export default function MoodSection() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const moodConfig = selectedMood
    ? MOOD_CONFIGS.find((m) => m.id === selectedMood)
    : null;

  const { bundleVariations, isLoading, hasBundles } = useBundleBuilder({
    keywords: moodConfig?.keywords || [],
    variations: 3,
  });

  return (
    <div>
      {/* Hero Section - Home Page Style */}
      <div className="relative px-6 pt-4 pb-12 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-[#ECB176]/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#A67B5B]/15 to-transparent rounded-full blur-2xl" />
        </div>

        <div className="relative z-10">
          {/* Main Heading */}
          <div className="mb-8">
            <h2 className="text-lg font-bold leading-tight tracking-tight mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="inline-block bg-gradient-to-r from-[#6F4E37] via-[#A67B5B] to-[#ECB176] bg-clip-text text-transparent">
                How are you feeling today?
              </span>
            </h2>
            <p className="text-sm text-[#6F4E37]/70 font-medium leading-relaxed max-w-sm">
              Discover curated bundles that match your mood and style
            </p>
          </div>

          {/* Mood Selector */}
          <MoodSelector
            selectedMood={selectedMood}
            onSelectMood={setSelectedMood}
          />
        </div>
      </div>

      {selectedMood && (
        <div className="px-6 pb-8 space-y-6">
          {/* Bundles Section Header */}
          <div className="flex items-center gap-3 pt-4">
            <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse" />
            <h2 className="text-2xl font-black bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] bg-clip-text text-transparent tracking-tight">
              {moodConfig?.title} Bundles
            </h2>
          </div>

          {isLoading ? (
            <div className="space-y-5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 shadow-lg border-2 border-[#A67B5B]/20"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="animate-pulse">
                        <SkeletonProductCard />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : hasBundles ? (
            <div className="space-y-5">
              {bundleVariations.map((variation) => (
                <BundleCard
                  key={variation.id}
                  bundleVariation={variation}
                  mood={selectedMood}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No bundles found"
              description="Try selecting a different mood or check back later"
            />
          )}
        </div>
      )}

      {!selectedMood && (
        <div className="px-6 pb-12">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ECB176]/20 to-[#FED8B1]/20 flex items-center justify-center mb-6"
              style={{
                boxShadow: "0 8px 24px rgba(111, 78, 55, 0.1)",
              }}
            >
              <div className="text-4xl">✨</div>
            </div>
            <p className="text-base text-[#6F4E37]/70 font-medium text-center max-w-xs leading-relaxed">
              Choose a mood above to discover personalized bundles curated just for you
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

