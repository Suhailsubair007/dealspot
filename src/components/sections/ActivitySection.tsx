import { useState, useRef, useEffect } from "react";
import type { ActivityType } from "../../types/bundles";
import { ACTIVITY_CONFIGS } from "../../constants";
import ActivitySelector from "../bundle/ActivitySelector";
import BundleCard from "../bundle/BundleCard";
import { useBundleBuilder } from "../../hooks/useBundleBuilder";
import EmptyState from "../common/EmptyState";
import SkeletonProductCard from "../common/SkeletonProductCard";

export default function ActivitySection() {
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityType | null>(null);
  const bundlesRef = useRef<HTMLDivElement>(null);

  const activityConfig = selectedActivity
    ? ACTIVITY_CONFIGS.find((a) => a.id === selectedActivity)
    : null;

  const { bundleVariations, isLoading, hasBundles } = useBundleBuilder({
    keywords: activityConfig?.keywords || [],
    variations: 3,
  });

  // Scroll to bundles when an activity is selected and bundles are loaded
  useEffect(() => {
    if (selectedActivity && hasBundles && bundlesRef.current) {
      setTimeout(() => {
        bundlesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [selectedActivity, hasBundles]);

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-black leading-none tracking-tight">
          <span className="inline-block bg-gradient-to-r from-[#6F4E37] via-[#A67B5B] to-[#ECB176] bg-clip-text text-transparent">
            What are you up to?
          </span>
        </h2>
        <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse" />
        <p className="text-xs text-[#6F4E37]/70 font-semibold leading-tight">
          Choose an activity
        </p>
      </div>

      <ActivitySelector
        selectedActivity={selectedActivity}
        onSelectActivity={setSelectedActivity}
      />

      {selectedActivity && (
        <div ref={bundlesRef} className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse" />
            <h3 className="text-lg font-black bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] bg-clip-text text-transparent tracking-tight">
              {activityConfig?.title} Bundles
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
                  activity={selectedActivity}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No bundles found"
              description="Try selecting a different activity or check back later"
            />
          )}
        </div>
      )}

      {!selectedActivity && (
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
              Select an activity above to see curated bundles
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

