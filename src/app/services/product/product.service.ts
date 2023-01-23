import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Product } from './../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  update(value: Product) {
    return this.httpClient.put<Product>(
      environment.API_URL + '/products/' + value.id,
      value
    );
  }

  create(value: Product) {
    return this.httpClient.post<Product>(
      environment.API_URL + '/products',
      value
    );
  }

  delete(productId: string) {
    return this.httpClient.delete<Product>(
      environment.API_URL + '/products/' + productId
    );
  }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.API_URL + '/products');
  }

  get(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(
      environment.API_URL + '/products/' + productId
    );
  }

  buyItem(productId: string, userId: string): Observable<Product> {
    return this.httpClient.get<Product>(
      ` ${environment.API_URL}/products/buy/${productId}/${userId}`
    );
  }

  getCart(userId: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      ` ${environment.API_URL}/products/boughtProducts/${userId}`
    );
  }
}
