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
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-black leading-none tracking-tight">
          <span className="inline-block bg-gradient-to-r from-[#6F4E37] via-[#A67B5B] to-[#ECB176] bg-clip-text text-transparent">
            How are you feeling?
          </span>
        </h2>
        <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse" />
        <p className="text-xs text-[#6F4E37]/70 font-semibold leading-tight">
          Choose your mood
        </p>
      </div>

      <MoodSelector
        selectedMood={selectedMood}
        onSelectMood={setSelectedMood}
      />

      {selectedMood && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse" />
            <h3 className="text-lg font-black bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] bg-clip-text text-transparent tracking-tight">
              {moodConfig?.title} Bundles
            </h3>
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
        <div className="pt-12 text-center">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(111, 78, 55, 0.1) 0%, rgba(166, 123, 91, 0.1) 100%)",
              boxShadow: "0 4px 16px rgba(111, 78, 55, 0.15)",
            }}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-[#6F4E37] animate-pulse" />
            <p className="text-sm text-[#6F4E37]/80 font-semibold">
              Select a mood above to see curated bundles
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

