import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from './../../models/order.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly API_URL: string = environment.API_URL + '/orders';

  constructor(private http: HttpClient) {}

  create(order: Order): Observable<any> {
    return this.http.post(this.API_URL, order);
  }

  get(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.API_URL + '/GetByUserId/' + userId);
  }

  deleteByProductId(productId: string): Observable<any> {
    return this.http.delete<any>(this.API_URL + '/Product/' + productId);
  }
}
