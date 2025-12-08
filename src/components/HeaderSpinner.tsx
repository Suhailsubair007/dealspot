import { Loader2 } from "lucide-react";

interface HeaderSpinnerProps {
  className?: string;
}

export default function HeaderSpinner({ className = "" }: HeaderSpinnerProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label="Loading"
    >
      <Loader2
        className="w-5 h-5 text-white animate-spin"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </div>
  );
}

