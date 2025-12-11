import { useState } from "react";
import type { BundleVariation } from "../../types/bundles";
import BundleProductItem from "./BundleProductItem";
import { Plus } from "lucide-react";

interface BundleCardProps {
  bundleVariation: BundleVariation;
  mood?: string;
  activity?: string;
}

export default function BundleCard({
  bundleVariation,
  mood,
  activity,
}: BundleCardProps) {
  const [showFourthProduct, setShowFourthProduct] = useState(false);

  const firstThreeProducts = bundleVariation.products.slice(0, 3);
  const fourthProduct = bundleVariation.products[3];
  const hasFourthProduct = bundleVariation.products.length >= 4;

  const description = mood
    ? `A ${mood} bundle curated just for you`
    : activity
    ? `Everything you need for ${activity}`
    : `Handpicked products just for you`;

  return (
    <div 
      id={`bundle-${bundleVariation.id}`} 
      className="relative rounded-3xl p-6 mb-6 overflow-hidden group transition-all duration-300 hover:scale-[1.01]"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(166, 123, 91, 0.1), 0 2px 8px rgba(166, 123, 91, 0.05)",
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6F4E37]/5 via-[#A67B5B]/3 to-[#ECB176]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6F4E37]/10 via-[#A67B5B]/5 to-transparent rounded-full blur-3xl -z-0" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] animate-pulse shadow-lg shadow-[#6F4E37]/50" />
            <h3 className="text-2xl font-black bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] bg-clip-text text-transparent tracking-tight">
              {bundleVariation.name}
            </h3>
          </div>
          {description && (
            <p className="text-sm text-[#6F4E37]/70 font-semibold leading-relaxed pl-5">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {firstThreeProducts.map((product) => (
            <BundleProductItem key={product.id} product={product} />
          ))}
          
          {/* Show +1 indicator or 4th product */}
          {hasFourthProduct && (
            showFourthProduct ? (
              <BundleProductItem product={fourthProduct} />
            ) : (
              <button
                type="button"
                onClick={() => setShowFourthProduct(true)}
                className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-[200px] flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(111, 78, 55, 0.1) 0%, rgba(166, 123, 91, 0.1) 100%)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 16px rgba(111, 78, 55, 0.08), 0 1px 4px rgba(111, 78, 55, 0.04)",
                  border: "2px dashed rgba(111, 78, 55, 0.3)",
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6F4E37] to-[#A67B5B] flex items-center justify-center shadow-lg">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-black bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] bg-clip-text text-transparent">
                    +1
                  </span>
                  <span className="text-xs text-[#6F4E37]/60 font-semibold">
                    More
                  </span>
                </div>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

