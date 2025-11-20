import {
  List,
  ProductCard,
  useNavigateWithTransition,
  usePopularProducts,
} from "@shopify/shop-minis-react";
import { ArrowLeft, TrendingUp, Zap, Star, Store, Package } from "lucide-react";
import { useMemo } from "react";
import { useLocation } from "react-router";
import {
  getMegaDeals,
  getPopularProducts,
  getStoreWiseDeals,
  getTopDeals,
} from "../utils/productUtils";

type SectionType = "topDeals" | "megaDeals" | "popular" | "storeDeals";

const getSectionIcon = (type: SectionType) => {
  switch (type) {
    case "topDeals":
      return TrendingUp;
    case "megaDeals":
      return Zap;
    case "popular":
      return Star;
    case "storeDeals":
      return Store;
    default:
      return Package;
  }
};

export default function FullListScreen() {
  const { products: popularProducts } = usePopularProducts({ first: 50 });
  const navigate = useNavigateWithTransition();
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const type = (searchParams.get("type") ?? "topDeals") as SectionType;
  const storeFromParams = searchParams.get("store");

  const productPool = useMemo(() => popularProducts ?? [], [popularProducts]);

  const storeWise = useMemo(
    () => getStoreWiseDeals(productPool),
    [productPool]
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

        return Object.values(storeWise).flat().slice(0, 20);
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

  const Icon = getSectionIcon(type);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#CCCCFF]/10 via-white to-white">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-br from-[#CCCCFF] via-[#A3A3CC] to-[#5C5C99] pt-6 pb-6 px-4 rounded-b-3xl shadow-lg">
        <button
          className="mb-4 p-2.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-200"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40">
            <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-white drop-shadow-md">
            {sectionTitleMap[type] ?? "Deals"}
          </h2>
        </div>
      </div>

      <div className="px-4 pb-6 pt-6">
        {derivedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Package className="w-16 h-16 text-[#A3A3CC] mb-4" strokeWidth={1.5} />
            <p className="text-base text-gray-600 font-medium text-center">
              We're loading fresh deals for you. Check back in a moment.
            </p>
          </div>
        ) : (
          <List
            items={derivedProducts}
            horizontalDirection={false}
            showScrollbar={false}
            height={600}
            renderItem={(product) => (
              <div className="mb-4 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <ProductCard  product={product} />
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}
