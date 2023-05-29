import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { ProductComponent } from './page/product/product.component';
import { ProductDetailsComponent } from './page/product-details/product-details.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/product.effects';
import { productsReducer } from './store/products.reducer';
import { cartReducer } from './store/cart.reducer';
// y

export const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'products', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
];

// const rootReducer = combineReducers({
//     feature1: feature1Reducer,
//     feature2: feature2Reducer
//   });
@NgModule({
  declarations: [ProductComponent, ProductDetailsComponent, ProductCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('products', productsReducer),
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  providers: [],
})
export class ProductModule {}