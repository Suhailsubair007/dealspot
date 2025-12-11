import type { Product } from "@shopify/shop-minis-react";

export type MoodType = "cozy" | "productive" | "adventurous" | "minimalist";
export type ActivityType =
  | "back-to-college"
  | "christmas"
  | "starter-home"
  | "travel-kit"
  | "desk-setup"
  | "fitness-gear";

export interface Bundle {
  id: string;
  name: string;
  description: string;
  products: Product[];
  mood?: MoodType;
  activity?: ActivityType;
  createdAt: number;
  saved: boolean;
}

export interface BundleVariation {
  id: string;
  name: string;
  products: Product[];
}

export interface MoodConfig {
  id: MoodType;
  title: string;
  description: string;
  keywords: string[];
  icon: string;
}

export interface ActivityConfig {
  id: ActivityType;
  title: string;
  description: string;
  keywords: string[];
  icon: string;
}

