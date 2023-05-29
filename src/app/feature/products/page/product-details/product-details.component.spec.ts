/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductDetailsComponent } from './product-details.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { loadProduct } from '../../store/products.actions';
import { addToCart } from '../../store/cart.actions';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let store: MockStore;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
     TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1' 
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    activatedRoute = TestBed.inject(ActivatedRoute);

    component.product$ = of(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the product with the given ID on initialization', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadProduct({ productId: 1 }));
  });

  it('should display the product details', () => {
    component.product$ = of({
      id: 1,
      title: 'Test Product',
      price: 10.99,
      description: 'Test description',
      image: 'https://picsum.photos/200/300',
      category: 'Test category',
      rating: { rate: 1, count: 1 },
    });

    fixture.detectChanges();
    const productNameElement = fixture.debugElement.query(By.css('.product-title'));
    expect(productNameElement.nativeElement.textContent).toBe('Test Product');

    const productPriceElement = fixture.debugElement.query(By.css('.product-price'));
    expect(productPriceElement.nativeElement.textContent).toBe('$10.99');

    const productRatingElement = fixture.debugElement.query(By.css('.product-rating'));
    expect(productRatingElement).toBeTruthy();
    

    const productDescriptionElement = fixture.debugElement.query(By.css('.product-description'));
    expect(productDescriptionElement.nativeElement.textContent).toBe('Test description');

    const ratingIconElement = fixture.debugElement.query(By.css('.rating-icon'));
    expect(ratingIconElement).toBeTruthy();

    const productCategoryElement = fixture.debugElement.query(By.css('.product-category'));
    expect(productCategoryElement.nativeElement.textContent).toBe('Category: TEST CATEGORY');

    const productImageElement = fixture.debugElement.query(By.css('.product-image'));
    expect(productImageElement).toBeTruthy();
    expect(productImageElement.nativeElement.src).toBe('https://picsum.photos/200/300');

    const addToCartButtonElement = fixture.debugElement.query(By.css('.addToCart-btn'));
    expect(addToCartButtonElement).toBeTruthy();
    expect(addToCartButtonElement.nativeElement.textContent).toBe('Add to Cart');
  });

  it('should dispatch the addToCart action when adding the product to cart', () => {
    spyOn(store, 'dispatch');
    const product = {
      id: 1,
      title: 'Test Product',
      price: 10.99,
      description: 'Test description',
      image: 'https://picsum.photos/200/300',
      category: 'Test category',
      rating: { rate: 1, count: 1 },
    };
    component.addToCart(product);
    expect(store.dispatch).toHaveBeenCalledWith(addToCart({ product, cartId: '1' }));
  });

});
