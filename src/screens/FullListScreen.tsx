import {
  Button,
  List,
  ProductCard,
  useNavigateWithTransition,
  usePopularProducts,
} from "@shopify/shop-minis-react";
import { useMemo } from "react";
import { useLocation } from "react-router";
import Header from "../components/Header";
import {
  getMegaDeals,
  getPopularProducts,
  getStoreWiseDeals,
  getTopDeals,
} from "../utils/productUtils";

type SectionType = "topDeals" | "megaDeals" | "popular" | "storeDeals";

export default function FullListScreen() {
  const { products: popularProducts } = usePopularProducts({ first: 100 });
  const navigate = useNavigateWithTransition();
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const type = (searchParams.get("type") ?? "topDeals") as SectionType;
  const storeFromParams = searchParams.get("store");

  const productPool = useMemo(
    () => popularProducts ?? [],
    [popularProducts],
  );

  const storeWise = useMemo(
    () => getStoreWiseDeals(productPool),
    [productPool],
  );

  const derivedProducts = useMemo(() => {
    switch (type) {
      case "megaDeals":
        return getMegaDeals(productPool);
      case "popular":
        return getPopularProducts(productPool);
      case "storeDeals":
        if (storeFromParams) {
          return storeWise[storeFromParams] ?? [];
        }

        return Object.values(storeWise)
          .flat()
          .slice(0, 20);
      case "topDeals":
      default:
        return getTopDeals(productPool);
    }
  }, [productPool, storeWise, storeFromParams, type]);

  const sectionTitleMap: Record<SectionType, string> = {
    topDeals: "All Top Deals",
    megaDeals: "All Mega Deals",
    popular: "All Popular Picks",
    storeDeals: storeFromParams
      ? `${storeFromParams} Deals`
      : "Store-wise Deals",
  };

  return (
    <div className="flex min-h-screen flex-col bg-white px-4 pb-10 pt-6">
      <Button
        className="self-start text-sm font-medium text-indigo-600"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Header />
      <h2 className="mt-4 text-xl font-semibold">
        {sectionTitleMap[type] ?? "Deals"}
      </h2>

      <div className="mt-4">
        {derivedProducts.length === 0 ? (
          <p className="text-sm text-gray-500">
            We’re loading fresh deals for you. Check back in a moment.
          </p>
        ) : (
          <List
            items={derivedProducts}
            horizontalDirection={false}
            showScrollbar={false}
            renderItem={(product) => (
              <div className="py-2">
                <ProductCard product={product} />
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}

