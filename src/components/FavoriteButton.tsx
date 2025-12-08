import { memo, useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";

interface FavoriteButtonProps {
  productId: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

function FavoriteButton({
  productId,
  className = "",
  size = "md",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  const favorited = isFavorite(productId);

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsAnimating(true);
    toggleFavorite(productId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={`
        ${sizeClasses[size]}
        ${className}
        flex items-center justify-center
        rounded-full
        bg-white/90 backdrop-blur-sm
        shadow-lg
        border-2
        transition-all duration-300
        active:scale-95
        min-h-[48px] min-w-[48px]
        ${
          favorited
            ? "border-red-500 bg-red-50"
            : "border-gray-200 hover:border-red-300"
        }
        ${isAnimating ? "scale-110" : ""}
      `}
    >
      <Heart
        className={`
          ${iconSizes[size]}
          transition-all duration-300
          ${favorited ? "fill-red-500 text-red-500" : "text-gray-600"}
          ${isAnimating ? "scale-125" : ""}
        `}
        strokeWidth={favorited ? 0 : 2.5}
        aria-hidden="true"
      />
    </button>
  );
}

export default memo(FavoriteButton);

