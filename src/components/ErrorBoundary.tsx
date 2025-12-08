import { Component, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#F5EFE7]/10 via-white to-white">
          <div className="max-w-md w-full text-center">
            <AlertTriangle
              className="w-16 h-16 text-[#D8C4B6] mb-4 mx-auto"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              We encountered an error. Please try again.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#3E5879] to-[#213555] text-white font-semibold shadow-lg active:shadow-xl transition-all duration-300 min-h-[48px]"
              aria-label="Try again"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

