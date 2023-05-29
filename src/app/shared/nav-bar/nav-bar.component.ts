import { clearCart, removeAllCartItem, removeFromCart } from './../../feature/products/store/cart.actions';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { addToCart } from 'src/app/feature/products/store/cart.actions';
import { CartState, getCartItems, getTotalAmount, getTotalQuantity } from 'src/app/feature/products/store/cart.reducer';
import { CartItem } from 'src/app/utils/models/cartItem';
import { Product } from 'src/app/utils/models/product';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  totalQuantity$: Observable<number> | undefined = of(0);
  cart$: Observable<CartItem[]> | undefined = of([]);
  totalAmount$: Observable<number |undefined> = of(0);
  display: boolean = false;
  
  constructor(private store: Store<CartState>) { }

  ngOnInit() {
    this.totalQuantity$ = this.store.pipe(select(getTotalQuantity))
    this.cart$ = this.store.pipe(select(getCartItems))
    this.totalAmount$ = this.store.pipe(select(getTotalAmount))
  }

  toggleDisplay() {
    this.display = !this.display;
  }

  increaseQuantity(product: Product){
    this.store.dispatch(addToCart({ product, cartId: '1' }));
  }

  reduceQuantity(product: Product){
    this.store.dispatch(removeFromCart({ productId:product.id, cartId: '1' }));
  }

  removeAll(product: Product){
    this.store.dispatch(removeAllCartItem({ productId:product.id, cartId: '1' }));
  }

  checkOut(){
    this.store.dispatch(clearCart())
  }
}
