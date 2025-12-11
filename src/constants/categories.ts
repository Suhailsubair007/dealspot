import type { LucideIcon } from "lucide-react";
import {
  Shirt,
  Laptop,
  Home,
  UtensilsCrossed,
  Baby,
  Gamepad2,
  Dumbbell,
  Heart,
  Sparkles,
  Watch,
  Headphones,
  BookOpen,
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  searchQuery: string;
  icon: LucideIcon;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
  id: "fashion",
  name: "Fashion",
  searchQuery: "clothing apparel fashion",
  icon: Shirt,
  color: "from-pink-500 to-rose-500",
},
{
  id: "electronics",
  name: "Electronics",
  searchQuery: "electronics gadgets tech",
  icon: Laptop,
  color: "from-blue-500 to-cyan-500",
},
{
  id: "home",
  name: "Home & Living",
  searchQuery: "home decor furniture",
  icon: Home,
  color: "from-amber-500 to-orange-500",
},
{
  id: "food",
  name: "Food & Drink",
  searchQuery: "food beverages",
  icon: UtensilsCrossed,
  color: "from-green-500 to-emerald-500",
},
{
  id: "baby",
  name: "Baby & Kids",
  searchQuery: "baby kids children",
  icon: Baby,
  color: "from-purple-500 to-pink-500",
},
{
  id: "gaming",
  name: "Gaming",
  searchQuery: "gaming games video games",
  icon: Gamepad2,
  color: "from-indigo-500 to-purple-500",
},
{
  id: "sports",
  name: "Sports & Fitness",
  searchQuery: "sports fitness exercise",
  icon: Dumbbell,
  color: "from-red-500 to-orange-500",
},
{
  id: "beauty",
  name: "Beauty & Health",
  searchQuery: "beauty health cosmetics",
  icon: Heart,
  color: "from-rose-500 to-pink-500",
},
{
  id: "accessories",
  name: "Accessories",
  searchQuery: "accessories jewelry",
  icon: Sparkles,
  color: "from-yellow-500 to-amber-500",
},
{
  id: "watches",
  name: "Watches",
  searchQuery: "watches timepieces",
  icon: Watch,
  color: "from-gray-600 to-gray-800",
},
{
  id: "audio",
  name: "Audio",
  searchQuery: "headphones speakers audio",
  icon: Headphones,
  color: "from-violet-500 to-purple-500",
},
{
  id: "books",
  name: "Books",
  searchQuery: "books reading",
  icon: BookOpen,
  color: "from-teal-500 to-cyan-500",
},
] as const;

export const CATEGORY_ITEMS_COUNT = 20;
