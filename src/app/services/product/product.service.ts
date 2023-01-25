import { OrderService } from './../order/order.service';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Product } from './../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpClient: HttpClient,
    private orderService: OrderService
  ) {}

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
    this.orderService
      .deleteByProductId(productId)
      .subscribe((res) => console.log('orders deleted', res));

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
