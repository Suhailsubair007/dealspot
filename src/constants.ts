import { Flame, Sparkles, Clock, Heart } from "lucide-react";
import type { SpotConfig } from "./types/spots";

export const SPOT_CONFIGS: SpotConfig[] = [
  {
    id: "trending",
    title: "Trending Spot",
    subtitle: "Discover what's popular across Shop.",
    description: "See what's hot right now.",
    icon: Flame,
    path: "/trending",
  },
  {
    id: "recommended",
    title: "Recommended Spot",
    subtitle: "Hand-picked for you by Shop.",
    description: "Personalized just for you.",
    icon: Sparkles,
    path: "/recommended",
  },
  {
    id: "recent",
    title: "Recent Spot",
    subtitle: "Pick up where you left off.",
    description: "Continue exploring.",
    icon: Clock,
    path: "/recent",
  },
  {
    id: "saved",
    title: "Saved Spot",
    subtitle: "Your favorites in one place.",
    description: "Your saved items.",
    icon: Heart,
    path: "/saved",
  },
];

export const DEFAULT_PRODUCTS_FETCH_COUNT = 30;
export const POPULAR_PRODUCTS_FETCH_POLICY = "cache-first" as const;
