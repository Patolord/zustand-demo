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

import ChangeQtyButtons from "./components/ChangeQtyButtons";
import Cart from "./components/Cart";
import User from "./components/User";

export default function App() {
  const { addProduct, products: cartProducts } = useStore(
    useShallow((state) => ({
      address: state.address,
      addProduct: state.addProduct,
      products: state.products,
    }))
  );

  return (
    <main className="space-y-2 dark h-screen bg-background max-w-sm mx-auto mt-2">
      <div className="flex justify-between">
        <User />
        <Cart />
      </div>
      <h1 className="text-2x">
        Products:
        <span className="text-2x"> {cartProducts.length}</span>
      </h1>
      <div className="space-y-2">
        {PRODUCTS_DATA.map((product) => (
          <Card key={product.id}>
            <CardHeader>{product.title}</CardHeader>
            <CardContent>${product.price}</CardContent>
            <CardFooter>
              {cartProducts.find((item) => item.id === product.id) ? (
                <ChangeQtyButtons productId={product.id} />
              ) : (
                <Button variant="default" onClick={() => addProduct(product)}>
                  Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
