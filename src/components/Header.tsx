import { Card } from "@shopify/shop-minis-react";
import { Sparkles, ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <Card className="mb-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#CCCCFF] via-[#A3A3CC] to-[#5C5C99] px-5 py-6 text-white shadow-xl border-0">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl" />
      </div>
      
      <div className="relative z-10 flex w-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-white/90" strokeWidth={2.5} />
              <p className="text-xs uppercase tracking-widest text-white/90 font-medium">
                Curated for you
              </p>
            </div>
            <h1 className="text-4xl font-bold tracking-tight drop-shadow-lg">
              DealSpot
            </h1>
          </div>
          <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
            <ShoppingBag className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
        </div>
        <p className="mt-5 text-sm text-white/95 leading-relaxed font-medium">
          Top Deals, Mega Discounts &amp; Popular Picks — all in one place.
        </p>
      </div>
    </Card>
  );
}
