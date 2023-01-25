import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../../services/order/order.service';
import { Order } from './../../../models/order.model';
import { UserService } from 'src/app/services/user/user.service';
import { Product } from './../../../models/product.model';
import { Observable } from 'rxjs';
import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  productId!: string;
  product$: Observable<Product>;
  selectedQuantity: number | null;
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly orderService: OrderService,
    private readonly toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId')!;
    console.log(this.productId);
    this.selectedQuantity = 1;

    this.product$ = this.productService.get(this.productId);
  }

  ngOnInit(): void {}

  buyProduct() {
    const order = new Order();
    order.productId = this.productId;
    order.quantity = <number>this.selectedQuantity;
    order.userId = this.userService.getCurrentUser().id;

    // this.productService
    //   .buyItem(this.productId, this.userService.getCurrentUser().id)
    //   .subscribe((res) => {
    //     console.log('product bought', res);
    //     location.reload();
    //   });

    this.orderService.create(order).subscribe((res) => {
      this.toastrService.success('Order added');
      this.product$ = this.productService.get(this.productId);
      this.selectedQuantity = 1;
    });
  }
}
