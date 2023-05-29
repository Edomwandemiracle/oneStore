import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/utils/models/product';
import { Store, select } from '@ngrx/store';
import { ProductsState, getProducts } from '../../store/products.reducer';
import { loadProducts } from '../../store/products.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor( private store: Store<ProductsState>) { }

  ngOnInit(): void {
  this.store.dispatch(loadProducts())
  this.products$ = this.store.pipe(select(getProducts))
}
}
