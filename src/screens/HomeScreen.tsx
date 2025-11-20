import {
  useNavigateWithTransition,
  usePopularProducts,
} from "@shopify/shop-minis-react";
import { useMemo } from "react";
import Header from "../components/Header";
import SectionScroller from "../components/SectionScroller";
import {
  getMegaDeals,
  getPopularProducts,
  getStoreWiseDeals,
  getTopDeals,
} from "../utils/productUtils";
import {
  DEFAULT_PRODUCTS_FETCH_COUNT,
  DEAL_SECTION_META,
  FEATURED_STORE_FALLBACK_NAME,
  POPULAR_PRODUCTS_FETCH_POLICY,
  QUICK_ACTION_CONFIG,
  SECTION_ORDER,
  DealSectionType,
} from "../constants";

export default function HomeScreen() {
  const { products: popularProducts } = usePopularProducts({
    first: DEFAULT_PRODUCTS_FETCH_COUNT,
    fetchPolicy: POPULAR_PRODUCTS_FETCH_POLICY,
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

    return FEATURED_STORE_FALLBACK_NAME;
  }, [storeWiseDeals]);

  const featuredStoreDeals =
    storeWiseDeals[featuredStoreName]?.slice(0, 5) ?? [];

  const quickActions = QUICK_ACTION_CONFIG.map((action) => {
    const destination =
      action.type === "storeDeals"
        ? `/full-list?type=storeDeals&store=${encodeURIComponent(
            featuredStoreName
          )}`
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

    return {
      key: sectionType,
      sectionType,
      title: meta.title,
      subtitle:
        sectionType === "storeDeals" ? featuredStoreName : meta.subtitle,
      products: sectionProductMap[sectionType],
      onShopAll: () =>
        navigate(
          sectionType === "storeDeals"
            ? `/full-list?type=storeDeals&store=${encodeURIComponent(
                featuredStoreName
              )}`
            : `/full-list?type=${sectionType}`
        ),
    };
  });

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
