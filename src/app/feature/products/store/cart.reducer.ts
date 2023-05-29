import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  addToCart,
  removeFromCart,
  clearCart,
  removeAllCartItem,
} from './cart.actions';
import { CartItem } from 'src/app/utils/models/cartItem';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product, cartId }) => {
    const existingItem = state.items.find(
      (item) => item.product.id === product.id && item.cartId === cartId
    );

    if (existingItem) {
      // Item already exists, increase quantity
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === product.id && item.cartId === cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    } else {
      // Item doesn't exist, add it to the cart
      return {
        ...state,
        items: [...state.items, { product, cartId, quantity: 1 }],
      };
    }
  }),
  on(removeFromCart, (state, { productId, cartId }) => {
    const itemToRemove = state.items.find(
      (item) => item.product.id === productId && item.cartId === cartId
    );

    if (itemToRemove) {
      if (itemToRemove.quantity > 1) {
        // Item quantity is greater than 1, reduce quantity
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === productId && item.cartId === cartId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        // Item quantity is 1, remove it from the cart
        return {
          ...state,
          items: state.items.filter(
            (item) => item.product.id !== productId || item.cartId !== cartId
          ),
        };
      }
    }

    return state;
  }),

  on(removeAllCartItem, (state, { productId, cartId }) => ({
    ...state,
    items: state.items.filter(
      (item) => item.product.id !== productId || item.cartId !== cartId
    ),
  })),

  on(clearCart, (state) => ({
    ...state,
    items: [],
  }))
);

export const getCartState = createFeatureSelector<CartState>('cart');

export const getCartItems = createSelector(
  getCartState,
  (state: CartState) => state.items
);
export const getTotalQuantity = createSelector(
  getCartItems,
  (items: CartItem[]) => {
    return items.reduce(
      (totalQuantity, item) => totalQuantity + item.quantity,
      0
    );
  }
);
export const getTotalAmount = createSelector(
  getCartItems,
  (items: CartItem[]) => {
    return items.reduce(
      (totalAmount, item) => totalAmount + item.product.price * item.quantity,
      0
    );
  }
);
