import { User } from './../../models/user.model';
import { ProductService } from './../../services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { Order } from './../../models/order.model';
import { Observable } from 'rxjs';
import { OrderService } from './../../services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders$: Observable<Order[]>;
  products$: Observable<Product[]>;
  users$: Observable<User[]>;
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService
  ) {
    this.orders$ = this.orderService.get(this.userService.getCurrentUser().id);
    this.products$ = this.productService.getAll();
    this.users$ = this.userService.get();
  }

  getProduct(products: Product[], productId: string): Product {
    return products.find((p) => p.id == productId)!;
  }

  getCurrentUserRole(): string {
    return this.userService.getCurrentUser().role;
  }

  ngOnInit(): void {}

  userChange(value: any) {
    this.orders$ = this.orderService.get(value);
  }
}
