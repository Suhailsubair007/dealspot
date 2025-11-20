import { Card, ProductCard } from "@shopify/shop-minis-react";
import type { Product } from "@shopify/shop-minis-react";
import { Package } from "lucide-react";
import { useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ShopAllButton from "./ShopAllButton";
import {
  DEAL_SECTION_ICON_MAP,
  DealSectionType,
  SECTION_CAROUSEL_AUTOPLAY_DELAY,
  SECTION_LOOP_THRESHOLD,
} from "../constants";

interface SectionScrollerProps {
  title: string;
  products: Product[];
  onShopAll: () => void;
  subtitle?: string;
  sectionType?: DealSectionType;
}

const getSectionIcon = (title: string, sectionType?: DealSectionType) => {
  if (sectionType) {
    return DEAL_SECTION_ICON_MAP[sectionType];
  }

  const titleLower = title.toLowerCase();
  if (titleLower.includes("top") || titleLower.includes("deal")) {
    return DEAL_SECTION_ICON_MAP.topDeals;
  }
  if (titleLower.includes("mega")) {
    return DEAL_SECTION_ICON_MAP.megaDeals;
  }
  if (titleLower.includes("popular") || titleLower.includes("pick")) {
    return DEAL_SECTION_ICON_MAP.popular;
  }
  if (titleLower.includes("store")) {
    return DEAL_SECTION_ICON_MAP.storeDeals;
  }
  return Package;
};

export default function SectionScroller({
  title,
  subtitle,
  products,
  onShopAll,
  sectionType,
}: SectionScrollerProps) {
  const hasProducts = products.length > 0;
  const Icon = getSectionIcon(title, sectionType);
  const loopCarousel = products.length > SECTION_LOOP_THRESHOLD;

  const shimmeredProducts = useMemo(() => {
    if (!loopCarousel) {
      return products;
    }

    // Duplicate the products to create an endless shimmer effect
    return [...products, ...products];
  }, [loopCarousel, products]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: loopCarousel,
      containScroll: "trimSnaps",
      dragFree: true,
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: SECTION_CAROUSEL_AUTOPLAY_DELAY,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnLastSnap: false,
      }),
    ]
  );

  useEffect(() => {
    if (!emblaApi) return;

    return () => {
      if (!emblaApi) return;
      emblaApi.destroy();
    };
  }, [emblaApi]);

  return (
    <section className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-[#CCCCFF] to-[#A3A3CC] shadow-md">
          <Icon className="w-5 h-5 text-[#292966]" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {subtitle ? (
            <p className="text-sm text-gray-600 font-medium">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <Card className="mt-2 rounded-3xl border-2 border-[#CCCCFF]/30 bg-gradient-to-br from-white to-[#CCCCFF]/10 px-3 py-5 shadow-xl backdrop-blur-md relative overflow-hidden">
        {hasProducts ? (
          <>
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-4">
                {shimmeredProducts.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className="flex-[0_0_70%] min-w-0 rounded-3xl overflow-hidden shadow-lg"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <Package className="w-12 h-12 text-[#A3A3CC] mb-3" strokeWidth={1.5} />
            <p className="text-sm text-gray-500 font-medium">
              Hang tight — we're loading fresh deals.
            </p>
          </div>
        )}

        <div className="mt-5">
          <ShopAllButton label="Shop all" onClick={onShopAll} />
        </div>
      </Card>
    </section>
  );
}
