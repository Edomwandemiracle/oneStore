import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { NavBarComponent } from './nav-bar.component';
import { CartItem } from 'src/app/utils/models/cartItem';
import { Product } from 'src/app/utils/models/product';
import { Store, MemoizedSelector } from '@ngrx/store';
import { getTotalQuantity, getCartItems, getTotalAmount } from 'src/app/feature/products/store/cart.reducer';
import { clearCart, removeFromCart, removeAllCartItem, addToCart } from 'src/app/feature/products/store/cart.actions';
import { By } from '@angular/platform-browser';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let store: MockStore;
  let mockTotalQuantitySelector: MemoizedSelector<unknown, number>;
  let mockCartItemsSelector: MemoizedSelector<unknown, CartItem[]>;
  let mockTotalAmountSelector: MemoizedSelector<unknown, number | undefined>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      providers: [provideMockStore()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    mockTotalQuantitySelector = store.overrideSelector(getTotalQuantity, 10);
    mockCartItemsSelector = store.overrideSelector(getCartItems, []);
    mockTotalAmountSelector = store.overrideSelector(getTotalAmount, 100);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize totalQuantity$ with the correct value', () => {
    component.totalQuantity$?.subscribe(quantity => {
      expect(quantity).toBe(10);
    });
  });

  it('should initialize cart$ with the correct value', () => {
    component.cart$?.subscribe(cartItems => {
      expect(cartItems).toEqual([]);
    });
  });

  it('should initialize totalAmount$ with the correct value', () => {
    component.totalAmount$?.subscribe(amount => {
      expect(amount).toBe(100);
    });
  });

  it('should toggle the display property', () => {
    expect(component.display).toBeFalse();

    component.toggleDisplay();
    expect(component.display).toBeTrue();

    component.toggleDisplay();
    expect(component.display).toBeFalse();
  });

  it('should dispatch addToCart action when calling increaseQuantity', () => {
    const product: Product = { id: 1, title: 'Product 1', price: 10, description: 'This is a description', image: 'https://picsum.photos/200/300', category: 'Category 1', rating: { rate: 1, count: 1 } };
    const dispatchSpy = spyOn(store, 'dispatch');

    component.increaseQuantity(product);

    expect(dispatchSpy).toHaveBeenCalledWith(addToCart({ product, cartId: '1' }));
  });

  it('should dispatch removeFromCart action when calling reduceQuantity', () => {
    const product: Product = { id: 1, title: 'Product 1', price: 10, description: 'This is a description', image: 'https://picsum.photos/200/300', category: 'Category 1', rating: { rate: 1, count: 1 } };
    const dispatchSpy = spyOn(store, 'dispatch');

    component.reduceQuantity(product);

    expect(dispatchSpy).toHaveBeenCalledWith(removeFromCart({ productId: 1, cartId: '1' }));
  });

  it('should dispatch removeAllCartItem action when calling removeAll', () => {
    const product: Product = { id: 1, title: 'Product 1', price: 10, description: 'This is a description', image: 'https://picsum.photos/200/300', category: 'Category 1', rating: { rate: 1, count: 1 } };
    const dispatchSpy = spyOn(store, 'dispatch');

    component.removeAll(product);

    expect(dispatchSpy).toHaveBeenCalledWith(removeAllCartItem({ productId: 1, cartId: '1' }));
  });

  it('should dispatch clearCart action when calling checkOut', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.checkOut();
    expect(dispatchSpy).toHaveBeenCalledWith(clearCart());
  });

  it('should display the logo', () => {
    const logoElement = fixture.debugElement.query(By.css('.navigation-bar-logo'));
    expect(logoElement).toBeTruthy();
    expect(logoElement.nativeElement.getAttribute('src')).toBe('assets/demostoreLogo.svg');
  });

  it('should display the cart icon', () => {
    const cartIconElement = fixture.debugElement.query(By.css('.cart-icon'));
    expect(cartIconElement).toBeTruthy();
    expect(cartIconElement.nativeElement.getAttribute('src')).toBe('assets/shopping-bag-new.svg');
  });

  it('should display the total quantity', () => {
    const totalQuantityElement = fixture.debugElement.query(By.css('.cart-number'));
    expect(totalQuantityElement).toBeTruthy();
    expect(totalQuantityElement.nativeElement.textContent).toBe('10');
  });

  it('should toggle the display when clicking the cart icon', () => {
    const cartIconElement = fixture.debugElement.query(By.css('.cart-icon'));
    cartIconElement.nativeElement.click();

    fixture.detectChanges();
    const cartItemsContainerElement = fixture.debugElement.query(By.css('.cart-items-container'));
    expect(cartItemsContainerElement).toBeTruthy();

    cartIconElement.nativeElement.click();

    fixture.detectChanges();
    const cartItemsContainerElementAfterToggle = fixture.debugElement.query(By.css('.cart-items-container'));
    expect(cartItemsContainerElementAfterToggle).toBeFalsy();
  });
});
