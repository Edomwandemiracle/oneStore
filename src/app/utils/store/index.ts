import { Action, ActionReducerMap } from '@ngrx/store';
import * as fromProducts from '../../feature/products/store/products.reducer';
import * as fromCart from '../../feature/products/store/cart.reducer';

export interface AppState {
    products: fromProducts.ProductsState;
    cart: fromCart.CartState;
}
export const rootReducer: ActionReducerMap<AppState, Action> = {
    products: fromProducts.productsReducer,
    cart: fromCart.cartReducer
}