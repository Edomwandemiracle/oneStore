import { ProductComponent } from '../products/page/product/product.component';
import { MainPageComponent } from './main-page.component';
import { Routes } from '@angular/router';


export const appRoutesLazyLoad: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: ProductComponent },
      {
        path: 'products',
        loadChildren: () =>
          import('../../feature/products/products.module').then(
            (m) => m.ProductModule
          ),
      },
    ],
  },
];
