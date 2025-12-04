import { ReactNode } from "react";

interface ProductGridProps {
  children: ReactNode;
  className?: string;
}

export default function ProductGrid({
  children,
  className = "",
}: ProductGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-5 px-5 ${className}`}>{children}</div>
  );
}

