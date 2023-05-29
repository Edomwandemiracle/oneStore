import { Product } from "./product";

export interface CartItem {
    cartId: string;
    product: Product;
    quantity: number;
  }