import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  loadProduct,
  loadProductSuccess,
  loadProductFailure,
} from './products.actions';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) =>
            of(loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProduct),
      mergeMap((action) =>
        this.productService.getProduct(action.productId).pipe(
          map((product) => loadProductSuccess({ product })),
          catchError((error) =>
            of(loadProductFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
