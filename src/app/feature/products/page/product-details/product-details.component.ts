import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ProductsState, getProduct } from '../../store/products.reducer';
import { Observable } from 'rxjs';
import { Product } from 'src/app/utils/models/product';
import { ActivatedRoute } from '@angular/router';
import { loadProduct } from '../../store/products.actions';
import { addToCart } from '../../store/cart.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<Product | null>;
  productId: string | null = '';

  constructor(private store: Store<ProductsState>,  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProduct(Number(this.productId));
}
  
  
  getProduct(id: number){
    this.store.dispatch(loadProduct({ productId: id }));
    this.product$ = this.store.pipe(select(getProduct))
  }

  addToCart(product: Product){
    this.store.dispatch(addToCart({ product, cartId: '1' }));
  }

}
