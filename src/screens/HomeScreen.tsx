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

      <div className="space-y-6 mt-2">
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
