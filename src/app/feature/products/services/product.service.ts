import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter } from 'rxjs';
import { Product } from '../../../utils/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient) { }

getProducts():Observable<Product[]> {
  return this.http.get<Product[]>(`${environment.BaseUrl}products`);
}

getProduct(id: number):Observable<Product> {
  return this.http.get<Product>(`${environment.BaseUrl}products/${id}`)
}

}
