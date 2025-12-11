import { createContext, useContext, ReactNode } from "react";
import { useBundleManager } from "../hooks/useBundleManager";
import type { Bundle } from "../types/bundles";
import type { Product } from "@shopify/shop-minis-react";

interface BundleContextType {
  bundles: Bundle[];
  setBundles: (bundles: Bundle[]) => void;
  removeProductFromBundle: (bundleId: string, productId: string) => void;
  replaceProductInBundle: (
    bundleId: string,
    oldProductId: string,
    newProduct: Product
  ) => void;
  viewProductDetails: (productId: string) => void;
}

const BundleContext = createContext<BundleContextType | undefined>(undefined);

export function BundleProvider({ children }: { children: ReactNode }) {
  const bundleManager = useBundleManager();

  return (
    <BundleContext.Provider value={bundleManager}>
      {children}
    </BundleContext.Provider>
  );
}

export function useBundleContext() {
  const context = useContext(BundleContext);
  if (context === undefined) {
    throw new Error("useBundleContext must be used within a BundleProvider");
  }
  return context;
}

