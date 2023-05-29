/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from 'src/app/utils/models/product';
import { TruncatePipe } from 'src/app/utils/pipe/truncate.pipe';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent, TruncatePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display products correctly', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 10.99,
        description: 'This is a description',
        image: 'https://picsum.photos/200/300',
        category: 'Category 1',
        rating: { rate: 1, count: 1 },
      },
      {
        id: 2,
        title: 'Product 2',
        price: 20.99,
        description: 'This is a description',
        image: 'https://picsum.photos/200/300',
        category: 'Category 2',
        rating: { rate: 1, count: 1 },
      },
    ];

    component.products = mockProducts;
    fixture.detectChanges();

    const productElements = fixture.nativeElement.querySelectorAll('.products');
    expect(productElements.length).toBe(mockProducts.length);

    productElements.forEach((productElement: HTMLElement, index: number) => {
      const titleElement = productElement.querySelector('.productName');
      const imageElement = productElement.querySelector('img');
      const priceElement = productElement.querySelector('.product-price');

      expect(titleElement?.textContent).toContain(mockProducts[index].title);
      expect(imageElement?.getAttribute('src')).toBe(mockProducts[index].image);
      expect(priceElement?.textContent).toContain(mockProducts[index].price.toFixed(2));
    });
  });
});

