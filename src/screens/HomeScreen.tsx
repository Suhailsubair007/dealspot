import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import { useMemo } from "react";
import type { Product } from "@shopify/shop-minis-react";
import Header from "../components/Header";
import SectionScroller from "../components/SectionScroller";
import {
  discountPercent,
  getMegaDeals,
  getPopularProducts,
  getStoreWiseDeals,
  getTopDeals,
} from "../utils/productUtils";
import {
  DEAL_SECTION_META,
  FEATURED_STORE_FALLBACK_NAME,
  QUICK_ACTION_CONFIG,
  SECTION_ORDER,
  DealSectionType,
} from "../constants";

interface HomeScreenProps {
  popularProducts: Product[] | null | undefined;
  loading: boolean;
}

export default function HomeScreen({
  popularProducts,
  loading: popularProductsLoading,
}: HomeScreenProps) {
  const navigate = useNavigateWithTransition();

  const productPool = useMemo(() => popularProducts ?? [], [popularProducts]);

  const topDeals = useMemo(() => getTopDeals(productPool), [productPool]);
  const megaDeals = useMemo(() => getMegaDeals(productPool), [productPool]);
  const popular = useMemo(() => getPopularProducts(productPool), [productPool]);

  const storeWiseDeals = useMemo(
    () => getStoreWiseDeals(productPool),
    [productPool]
  );

  const featuredStoreInfo = useMemo(() => {
    const entries = Object.entries(storeWiseDeals);

    if (entries.length === 0) {
      return {
        name: FEATURED_STORE_FALLBACK_NAME,
        id: null,
        deals: [],
      };
    }

    const [bestStoreName, bestStoreDeals] = entries.reduce<
      [string, Product[], number]
    >(
      (best, [store, deals]) => {
        if (deals.length === 0) {
          return best;
        }

        const highestDiscount = discountPercent(deals[0]);

        if (highestDiscount > best[2]) {
          return [store, deals, highestDiscount];
        }

        return best;
      },
      ["", [], -Infinity]
    );

    // Get store ID from the first product in the best store's deals
    const storeId = bestStoreDeals[0]?.shop?.id ?? null;

    return {
      name: bestStoreName || FEATURED_STORE_FALLBACK_NAME,
      id: storeId,
      deals: bestStoreDeals.slice(0, 5),
    };
  }, [storeWiseDeals]);

  const featuredStoreName = featuredStoreInfo.name;
  const featuredStoreId = featuredStoreInfo.id;
  const featuredStoreDeals = featuredStoreInfo.deals;

  const quickActions = QUICK_ACTION_CONFIG.map((action) => {
    const destination =
      action.type === "storeDeals"
        ? featuredStoreId
          ? `/store-deals?storeId=${encodeURIComponent(featuredStoreId)}`
          : "/store-deals"
        : action.type === "topDeals"
        ? "/top-deals"
        : action.type === "megaDeals"
        ? "/mega-deals"
        : action.type === "popular"
        ? "/popular-picks"
        : `/full-list?type=${action.type}`;

    const resolvedLabel =
      action.type === "storeDeals"
        ? `${featuredStoreName} Picks`
        : action.label;

    return {
      key: action.key,
      label: resolvedLabel,
      copy: action.copy,
      icon: action.icon,
      target: destination,
    };
  });

  const sectionProductMap: Record<DealSectionType, typeof topDeals> = {
    topDeals,
    megaDeals,
    popular,
    storeDeals: featuredStoreDeals,
  };

  const sectionConfigs = SECTION_ORDER.map((sectionType) => {
    const meta = DEAL_SECTION_META[sectionType];

    const getShopAllPath = () => {
      if (sectionType === "storeDeals") {
        return featuredStoreId
          ? `/store-deals?storeId=${encodeURIComponent(featuredStoreId)}`
          : "/store-deals";
      }
      if (sectionType === "topDeals") {
        return "/top-deals";
      }
      if (sectionType === "megaDeals") {
        return "/mega-deals";
      }
      if (sectionType === "popular") {
        return "/popular-picks";
      }
      return `/full-list?type=${sectionType}`;
    };

    return {
      key: sectionType,
      sectionType,
      title: meta.title,
      subtitle:
        sectionType === "storeDeals" ? featuredStoreName : meta.subtitle,
      products: sectionProductMap[sectionType],
      onShopAll: () => navigate(getShopAllPath()),
    };
  });

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#F5EFE7]/5 via-white to-white pb-10">
      <Header />
      <div className="mt-5 grid grid-cols-2 gap-3 px-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.key}
              className="flex flex-col items-start gap-2 rounded-2xl border-2 border-[#F5EFE7]/40 bg-white/70 px-4 py-4 text-left shadow-sm active:shadow-lg transition-all duration-300 min-h-[48px]"
              onClick={() => navigate(action.target)}
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#F5EFE7] to-[#D8C4B6] text-[#213555] shadow-md">
                <Icon className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {action.label}
                </p>
                <p className="text-xs text-gray-600 font-medium">
                  {action.copy}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-6 mt-6 px-4">
        {sectionConfigs.map((section) => (
          <SectionScroller
            isLoading={popularProductsLoading}
            key={section.key}
            title={section.title}
            sectionType={section.sectionType}
            subtitle={section.subtitle}
            products={section.products}
            onShopAll={section.onShopAll}
          />
        ))}
      </div>
    </div>
  );
}
