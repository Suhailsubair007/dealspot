export type SortOption =
  | "discount-desc"
  | "discount-asc"
  | "price-desc"
  | "price-asc"
  | "rating-desc"
  | "popularity-desc";

export interface FilterOption {
  minDiscount?: number;
  minPrice?: string;
  maxPrice?: string;
  minRating?: number;
}
