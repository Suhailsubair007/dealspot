import { Component, type ReactNode } from "react";
import { Alert } from "@shopify/shop-minis-react";
import { AlertCircle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
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
    // Log error for debugging (in production, this would go to error tracking service)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#F5EFE7]/10 via-white to-white">
          <div className="max-w-md">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="w-4 h-4" />
              <div className="ml-2">
                <h3 className="font-semibold">Something went wrong</h3>
                <p className="text-sm mt-1">
                  We encountered an error. Please try refreshing the app.
                </p>
                {this.state.error?.message && (
                  <p className="text-xs mt-2 text-gray-600">
                    {this.state.error.message}
                  </p>
                )}
              </div>
            </Alert>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
