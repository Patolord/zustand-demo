import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store/store";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";

type ChangeQtyButtonProps = {
  productId: string;
};

export default function ChangeQtyButtons({ productId }: ChangeQtyButtonProps) {
  const { getProductById, decQuantity, incQuantity, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQuantity: state.decQuantity,
      incQuantity: state.incQuantity,
      setTotal: state.setTotal,
    }))
  );

  const product = getProductById(productId);

  useEffect(() => {
    const unSubscribe = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          )
        );
      },
      { fireImmediately: true }
    );

    return unSubscribe;
  }, [setTotal]);

  return (
    <>
      {product && (
        <div className="flex gap-2 items-center">
          <Button size="icon" onClick={() => decQuantity(product.id)}>
            <Minus />
          </Button>
          <p>{product.quantity}</p>
          <Button size="icon" onClick={() => incQuantity(product.id)}>
            <Plus />
          </Button>
        </div>
      )}
    </>
  );
}
