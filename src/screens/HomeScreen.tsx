import {
  useNavigateWithTransition,
  usePopularProducts,
} from "@shopify/shop-minis-react";
import { Flame, Star, Store, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import Header from "../components/Header";
import SectionScroller from "../components/SectionScroller";
import {
  getMegaDeals,
  getPopularProducts,
  getStoreWiseDeals,
  getTopDeals,
} from "../utils/productUtils";

export default function HomeScreen() {
  const { products: popularProducts } = usePopularProducts({
    first:50,
    fetchPolicy: "cache-first",
  });
  const navigate = useNavigateWithTransition();

  const productPool = useMemo(
    () => popularProducts ?? [],
    [popularProducts]
  );

  const topDeals = useMemo(() => getTopDeals(productPool), [productPool]);
  const megaDeals = useMemo(() => getMegaDeals(productPool), [productPool]);
  const popular = useMemo(() => getPopularProducts(productPool), [productPool]);

  const storeWiseDeals = useMemo(
    () => getStoreWiseDeals(productPool),
    [productPool]
  );

  const featuredStoreName = useMemo(() => {
    const storeNames = Object.keys(storeWiseDeals);

    if (storeNames.length > 0) {
      return storeNames[0];
    }

    return "Mock Shop";
  }, [storeWiseDeals]);

  const featuredStoreDeals =
    storeWiseDeals[featuredStoreName]?.slice(0, 5) ?? [];

  const quickActions = [
    {
      key: "quick-top-deals",
      label: "Top Deals",
      copy: "Up to 60% off",
      icon: TrendingUp,
      target: "/full-list?type=topDeals",
    },
    {
      key: "quick-mega-deals",
      label: "Mega Drops",
      copy: "50%+ savings",
      icon: Flame,
      target: "/full-list?type=megaDeals",
    },
    {
      key: "quick-popular",
      label: "Popular Picks",
      copy: "Loved by shoppers",
      icon: Star,
      target: "/full-list?type=popular",
    },
    {
      key: "quick-store",
      label: `${featuredStoreName} Picks`,
      copy: "Store spotlight",
      icon: Store,
      target: `/full-list?type=storeDeals&store=${encodeURIComponent(
        featuredStoreName
      )}`,
    },
  ];

  const sectionConfigs = [
    {
      key: "top-deals",
      title: "Top Deals",
      subtitle: "Hand-picked price drops you can’t miss",
      products: topDeals,
      onShopAll: () => navigate("/full-list?type=topDeals"),
    },
    {
      key: "mega-deals",
      title: "Mega Deals",
      subtitle: "50% off and beyond",
      products: megaDeals,
      onShopAll: () => navigate("/full-list?type=megaDeals"),
    },
    {
      key: "popular-products",
      title: "Popular Picks",
      subtitle: "Loved by thousands of shoppers",
      products: popular,
      onShopAll: () => navigate("/full-list?type=popular"),
    },
    {
      key: "store-deals",
      title: "Store-wise Deals",
      subtitle: featuredStoreName,
      products: featuredStoreDeals,
      onShopAll: () =>
        navigate(
          `/full-list?type=storeDeals&store=${encodeURIComponent(
            featuredStoreName
          )}`
        ),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#CCCCFF]/5 via-white to-white px-4 pb-10 pt-6">
      <Header />
      <div className="mt-5 grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.key}
              className="flex flex-col items-start gap-2 rounded-2xl border-2 border-[#CCCCFF]/40 bg-white/70 px-4 py-3 text-left shadow-sm hover:shadow-lg transition-all duration-300"
              onClick={() => navigate(action.target)}
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#CCCCFF] to-[#A3A3CC] text-[#292966] shadow-md">
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

      <div className="space-y-6 mt-6">
        {sectionConfigs.map((section) => (
          <SectionScroller
            key={section.key}
            title={section.title}
            subtitle={section.subtitle}
            products={section.products}
            onShopAll={section.onShopAll}
          />
        ))}
      </div>
    </div>
  );
}
