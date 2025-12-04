import { Component, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@shopify/shop-minis-react";

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
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#B2B0E8]/10 flex items-center justify-center px-5">
          <div className="max-w-md w-full text-center">
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#B2B0E8]/20 to-[#B2B0E8]/10 mb-6 inline-block">
              <AlertTriangle className="w-10 h-10 text-[#3B38A0]" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-[#1A2A80] mb-3">
              Something went wrong
            </h2>
            <p className="text-sm text-[#7A85C1] mb-8 leading-relaxed">
              We encountered an unexpected error. Please try again or return to the home screen.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={this.handleReset}
                className="min-h-[48px] w-full bg-gradient-to-r from-[#1A2A80] to-[#3B38A0] text-white font-semibold rounded-2xl shadow-sm active:shadow-md active:scale-95 transition-all duration-200"
              >
                Try Again
              </Button>
              <Button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="min-h-[48px] w-full bg-gray-100 text-[#7A85C1] font-semibold rounded-2xl active:bg-gray-200 active:scale-95 transition-all duration-200"
              >
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

