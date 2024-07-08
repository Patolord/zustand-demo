import { StateCreator } from "zustand";
import { Product } from "../types/product";
import { CartProduct } from "../types/cartProduct";

type CartState = {
  products: CartProduct[];
  total: number;
};

type CartActions = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  incQuantity: (productId: string) => void;
  decQuantity: (productId: string) => void;
  getProductById: (productId: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
  products: [],
  total: 0,
};

export const createCartSlice: StateCreator<
  CartSlice,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initialState,
  incQuantity: (productId) =>
    set((state) => {
      const foundProduct = state.products.find((p) => p.id === productId);
      if (foundProduct) {
        foundProduct.quantity += 1;
      }
    }),
  decQuantity: (productId) =>
    set((state) => {
      const foundIndex = state.products.findIndex((p) => p.id === productId);
      if (foundIndex !== -1) {
        if (state.products[foundIndex].quantity === 1) {
          state.products.splice(foundIndex, 1);
        } else {
          state.products[foundIndex].quantity -= 1;
        }
      }
    }),
  addProduct: (product) =>
    set((state) => {
      state.products.push({ ...product, quantity: 1 });
    }),
  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    }),
  getProductById: (productId) =>
    get().products.find((product) => product.id === productId),
  setTotal: (total) =>
    set((state) => {
      state.total = total;
    }),
  reset: () => set(() => initialState),
});
