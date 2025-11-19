import { Card } from "@shopify/shop-minis-react";

export default function Header() {
  return (
    <Card className="mb-6 flex w-full flex-col justify-between rounded-3xl bg-gradient-to-br from-indigo-500/90 to-purple-500/80 px-5 py-6 text-white shadow-lg">
      <div>
        <p className="text-sm uppercase tracking-wide text-white/80">
          Curated for you
        </p>
        <h1 className="mt-1 text-3xl font-semibold">DealSpot</h1>
      </div>
      <p className="mt-4 text-base text-white/90">
        Top Deals, Mega Discounts &amp; Popular Picks — all in one place.
      </p>
    </Card>
  );
}
