import {
  Button,
  List,
  ProductCard,
  useNavigateWithTransition,
  usePopularProducts,
} from "@shopify/shop-minis-react";

export default function HomeScreen() {
  const { products, fetchMore } = usePopularProducts();
  const navigate = useNavigateWithTransition();

  const productRows = products
    ? Array.from({ length: Math.ceil(products.length / 2) }, (_, i) =>
        products.slice(i * 2, i * 2 + 2)
      )
    : [];
  return (
    <div className="pt-12 px-4 pb-6 bg-gray-300 min-h-screen">
      <h1 className="text-2xl font-bold mb-2 text-center">DealSpot</h1>
      <Button onClick={() => navigate("/full-list")}>
        Shop All
      </Button>
      <List
        items={productRows}
        height={screen.height - 150}
        showScrollbar={false}
        horizontalDirection={false}
        fetchMore={fetchMore}
        renderItem={(productRow) => (
          <div className="grid grid-cols-2 gap-4 p-4">
            {productRow.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      />
    </div>
  );
}
