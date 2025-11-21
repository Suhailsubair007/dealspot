import type { LucideIcon } from "lucide-react";
import { Flame, Star, Store, TrendingUp, Zap } from "lucide-react";

export type DealSectionType = "topDeals" | "megaDeals" | "popular" | "storeDeals";

export const COLOR_PALETTE = {
  lightBeige: "#F5EFE7",
  beige: "#D8C4B6",
  mediumBlue: "#3E5879",
  darkBlue: "#213555",
};

export const HEADER_VIBE_TAGS = [
  "Exclusive drops",
  "Limited stock",
  "Price drops",
  "Editors' picks",
] as const;

export const DEFAULT_PRODUCTS_FETCH_COUNT = 40;
export const POPULAR_PRODUCTS_FETCH_POLICY = "cache-first";

export const PRODUCT_SECTION_ITEM_LIMIT = 5;
export const SECTION_LOOP_THRESHOLD = 3;
export const SECTION_CAROUSEL_AUTOPLAY_DELAY = 4200;
export const QUICK_ACTION_AUTOPLAY_DELAY = 2600;
export const FULL_LIST_LIST_HEIGHT = 600;

export const FEATURED_STORE_FALLBACK_NAME = "Mock Shop";

export const DEAL_SECTION_META: Record<
  DealSectionType,
  { title: string; subtitle: string }
> = {
  topDeals: {
    title: "Top Deals",
    subtitle: "Hand-picked price drops you can’t miss",
  },
  megaDeals: {
    title: "Mega Deals",
    subtitle: "50% off and beyond",
  },
  popular: {
    title: "Popular Picks",
    subtitle: "Loved by thousands of shoppers",
  },
  storeDeals: {
    title: "Store-wise Deals",
    subtitle: "Store spotlight",
  },
};

export const DEAL_SECTION_ICON_MAP: Record<DealSectionType, LucideIcon> = {
  topDeals: TrendingUp,
  megaDeals: Zap,
  popular: Star,
  storeDeals: Store,
};

export type QuickActionConfig = {
  key: string;
  label: string;
  copy: string;
  icon: LucideIcon;
  type: DealSectionType;
};

export const QUICK_ACTION_CONFIG: QuickActionConfig[] = [
  {
    key: "quick-top-deals",
    label: "Top Deals",
    copy: "Up to 60% off",
    icon: TrendingUp,
    type: "topDeals",
  },
  {
    key: "quick-mega-deals",
    label: "Mega Drops",
    copy: "50%+ savings",
    icon: Flame,
    type: "megaDeals",
  },
  {
    key: "quick-popular",
    label: "Popular Picks",
    copy: "Loved by shoppers",
    icon: Star,
    type: "popular",
  },
  {
    key: "quick-store",
    label: "Store Picks",
    copy: "Store spotlight",
    icon: Store,
    type: "storeDeals",
  },
] as const;

export const SECTION_ORDER: DealSectionType[] = [
  "topDeals",
  "megaDeals",
  "popular",
  "storeDeals",
];

export const DEFAULT_SECTION_TYPE: DealSectionType = "topDeals";

export const SHOP_ALL_BUTTON_CLASSNAME =
  "w-full rounded-2xl py-3.5 text-sm font-bold bg-gradient-to-r from-[#3E5879] to-[#213555] text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0";
