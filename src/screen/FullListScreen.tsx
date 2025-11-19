import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import { Button } from "@shopify/shop-minis-react";

const FullListScreen = () => {
  const navigate = useNavigateWithTransition();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-center">DealSpot</h1>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
};

export default FullListScreen;
