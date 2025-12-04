import type { LucideIcon } from "lucide-react";

export type SpotType = "trending" | "recommended" | "recent" | "saved";

export interface SpotConfig {
  id: SpotType;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

