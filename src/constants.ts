import type { MoodConfig, ActivityConfig } from "./types/bundles";

export const DEFAULT_PRODUCTS_FETCH_COUNT = 30;
export const POPULAR_PRODUCTS_FETCH_POLICY = "cache-first" as const;
export const BUNDLE_PRODUCTS_COUNT = 4; // Number of products per bundle

export const MOOD_CONFIGS: MoodConfig[] = [
  {
    id: "cozy",
    title: "Feeling Cozy",
    description: "Warm blankets, candles, and comfort items",
    keywords: ["blanket", "candle", "room decor", "warm clothes", "comfort", "cozy", "soft", "pillow"],
    icon: "🕯️",
  },
  {
    id: "productive",
    title: "Feeling Productive",
    description: "Office essentials and productivity tools",
    keywords: ["desk", "notebook", "organizer", "productivity", "office", "work", "planner", "pen"],
    icon: "💼",
  },
  {
    id: "adventurous",
    title: "Feeling Adventurous",
    description: "Outdoor gear and adventure essentials",
    keywords: ["outdoor", "backpack", "hiking", "camping", "adventure", "travel", "gear", "explore"],
    icon: "🏔️",
  },
  {
    id: "minimalist",
    title: "Feeling Minimalist",
    description: "Clean, simple, and essential items",
    keywords: ["minimal", "simple", "essential", "clean", "basic", "neutral", "organizer", "storage"],
    icon: "✨",
  },
];

export const ACTIVITY_CONFIGS: ActivityConfig[] = [
  {
    id: "back-to-college",
    title: "Back to College Setup",
    description: "Everything you need for dorm life",
    keywords: ["dorm", "college", "student", "desk", "storage", "organizer", "school supplies", "laptop"],
    icon: "🎒",
  },
  {
    id: "christmas",
    title: "Christmas Shopping",
    description: "Perfect gifts and holiday essentials",
    keywords: ["christmas", "gifts", "holiday", "decorations", "ornaments", "wrapping", "stocking", "tree", "lights", "santa", "present"],
    icon: "🎄",
  },
  {
    id: "starter-home",
    title: "Starter Home Essentials",
    description: "Must-haves for your first place",
    keywords: ["home", "essentials", "kitchen", "bathroom", "bedroom", "decor", "furniture", "storage"],
    icon: "🏠",
  },
  {
    id: "travel-kit",
    title: "Travel Kit Under $50",
    description: "Affordable travel essentials",
    keywords: ["travel", "luggage", "toiletry", "packing", "portable", "compact", "essentials", "kit"],
    icon: "✈️",
  },
  {
    id: "desk-setup",
    title: "Desk Setup Makeover",
    description: "Transform your workspace",
    keywords: ["desk", "monitor", "keyboard", "mouse", "stand", "organizer", "light", "cable"],
    icon: "🖥️",
  },
  {
    id: "fitness-gear",
    title: "Daily Fitness Gear",
    description: "Everything for your workout routine",
    keywords: ["fitness", "workout", "yoga", "gym", "exercise", "sports", "equipment", "activewear"],
    icon: "🏋️",
  },
];
