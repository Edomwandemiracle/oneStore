import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/utils/models/product';


export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: Product; cartId: string }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: number; cartId: string }>()
);

export const removeAllCartItem = createAction(
    '[Cart] Remove All Cart Item',
    props<{ productId: number; cartId: string }>()
    );

export const clearCart = createAction('[Cart] Clear Cart');

