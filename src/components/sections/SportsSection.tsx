import BundleCard from "../bundle/BundleCard";
import { useBundleBuilder } from "../../hooks/useBundleBuilder";
import EmptyState from "../common/EmptyState";
import SkeletonProductCard from "../common/SkeletonProductCard";

export default function SportsSection() {
  const swimmingBundle = useBundleBuilder({
    keywords: [
      "swimming",
      "swimwear",
      "goggles",
      "swim cap",
      "pool",
      "aquatic",
      "water sports",
    ],
    variations: 4,
  });

  const athleticsBundle = useBundleBuilder({
    keywords: [
      "athletics",
      "track",
      "running",
      "sprint",
      "jump",
      "sports gear",
      "athletic",
    ],
    variations: 4,
  });

  const cyclingBundle = useBundleBuilder({
    keywords: [
      "cycling",
      "bike",
      "bicycle",
      "bike gear",
      "cycling accessories",
      "bike helmet",
      "cycling clothes",
    ],
    variations: 4,
  });

  const isLoading =
    swimmingBundle.isLoading ||
    athleticsBundle.isLoading ||
    cyclingBundle.isLoading;

  const hasAnyBundles =
    swimmingBundle.hasBundles ||
    athleticsBundle.hasBundles ||
    cyclingBundle.hasBundles;

  return (
    <div className="px-6 py-6 space-y-8">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold leading-none tracking-tight">
          <span className="inline-block bg-gradient-to-r from-[#6F4E37] via-[#A67B5B] to-[#ECB176] bg-clip-text text-transparent">
            Sports Essentials
          </span>
        </h2>
        <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse" />
        <p className="text-xs text-[#6F4E37]/70 font-semibold leading-tight">
          Gear up for your sport
        </p>
      </div>

      {/* Swimming Bundles */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse" />
          <h3 className="text-lg font-black bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] bg-clip-text text-transparent tracking-tight">
            Swimming Essentials
          </h3>
        </div>

        {swimmingBundle.isLoading ? (
          <div className="space-y-5">
            {[...Array(4)].map((_, i) => (
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
        ) : swimmingBundle.hasBundles ? (
          <div className="space-y-5">
            {swimmingBundle.bundleVariations.map((variation) => (
              <BundleCard key={variation.id} bundleVariation={variation} />
            ))}
          </div>
        ) : null}
      </div>

      {/* Athletics Bundles */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse" />
          <h3 className="text-lg font-black bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] bg-clip-text text-transparent tracking-tight">
            Athletics Gear
          </h3>
        </div>

        {athleticsBundle.isLoading ? (
          <div className="space-y-5">
            {[...Array(4)].map((_, i) => (
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
        ) : athleticsBundle.hasBundles ? (
          <div className="space-y-5">
            {athleticsBundle.bundleVariations.map((variation) => (
              <BundleCard key={variation.id} bundleVariation={variation} />
            ))}
          </div>
        ) : null}
      </div>

      {/* Cycling Bundles */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse" />
          <h3 className="text-lg font-black bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] bg-clip-text text-transparent tracking-tight">
            Cycling Collection
          </h3>
        </div>

        {cyclingBundle.isLoading ? (
          <div className="space-y-5">
            {[...Array(4)].map((_, i) => (
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
        ) : cyclingBundle.hasBundles ? (
          <div className="space-y-5">
            {cyclingBundle.bundleVariations.map((variation) => (
              <BundleCard key={variation.id} bundleVariation={variation} />
            ))}
          </div>
        ) : null}
      </div>

      {!isLoading && !hasAnyBundles && (
        <EmptyState
          title="No bundles found"
          description="Check back later for sports bundles"
        />
      )}
    </div>
  );
}

