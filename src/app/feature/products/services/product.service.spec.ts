/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/utils/models/product';

describe('Service: Product', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should have an instance of product service', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve products', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 10,
        description: 'This is a description',
        image: 'https://picsum.photos/200/300',
        category: 'Category 1',
        rating: { rate: 1, count: 1 },
      },
      {
        id: 2,
        title: 'Product 2',
        price: 20,
        description: 'This is a description',
        image: 'https://picsum.photos/200/300',
        category: 'Category 2',
        rating: { rate: 1, count: 1 },
      },
    ];

    productService.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(
      `${environment.BaseUrl}products`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should retrieve a product by ID', () => {
    const mockProduct: Product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      description: 'This is a description',
      image: 'https://picsum.photos/200/300',
      category: 'Category 1',
      rating: { rate: 1, count: 1 },
    };
    const productId = 1;

    productService.getProduct(productId).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(
      `${environment.BaseUrl}products/${productId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
});
