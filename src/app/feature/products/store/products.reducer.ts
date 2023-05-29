import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { loadProducts, loadProductsSuccess, loadProductsFailure, loadProduct, loadProductSuccess, loadProductFailure } from './products.actions';
import { Product } from 'src/app/utils/models/product';

export interface ProductsState {
  data: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProductsState = {
  data: [],
  product: null,
  loading: false,
  error: null
};

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({ ...state, loading: true })),
  on(loadProductsSuccess, (state, { products }) => ({ ...state, data: products, loading: false, error: null })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(loadProduct, (state) => ({ ...state, loading: true })),
  on(loadProductSuccess, (state, { product }) => ({ ...state, product: product, loading: false, error: null })),
  on(loadProductFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export const getProductsState = createFeatureSelector<ProductsState>('products');
export const getProducts = createSelector(
    getProductsState,
  (state: ProductsState) => state.data
);
export const getProduct = createSelector(
    getProductsState,
    (state: ProductsState) => state.product
);

