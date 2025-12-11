import { ReactNode } from "react";

interface ScreenContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ScreenContainer({
  children,
  className = "",
}: ScreenContainerProps) {
  return (
    <div
      className={`min-h-screen bg-[#B2B0E8]/10 text-[#111827] ${className}`}
      style={{
        paddingLeft: "max(env(safe-area-inset-left), 0px)",
        paddingRight: "max(env(safe-area-inset-right), 0px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 0px)",
      }}
    >
      {children}
    </div>
  );
}

