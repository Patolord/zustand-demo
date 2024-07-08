import { useShallow } from "zustand/react/shallow";
import { useStore } from "./store/store";
import { PRODUCTS_DATA } from "./lib/mockData";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Button } from "./components/ui/button";

export default function App() {
  const { address, addProduct, products } = useStore(
    useShallow((state) => ({
      address: state.address,
      addProduct: state.addProduct,
      products: state.products,
    }))
  );

  return (
    <main className="space-y-2 dark h-screen bg-background max-w-sm mx-auto mt-2">
      <h1 className="text-2x">
        Products:
        <span className="text-2x"> {products.length}</span>
      </h1>
      <div className="space-y-2">
        {PRODUCTS_DATA.map((product) => (
          <Card key={product.id}>
            <CardHeader>{product.title}</CardHeader>
            <CardContent>{product.price}$</CardContent>
            <CardFooter>
              <Button variant="default" onClick={() => addProduct(product)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
