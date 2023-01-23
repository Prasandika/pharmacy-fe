import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products$: Observable<Product[]>;
  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) {
    this.products$ = this.productService.getCart(
      this.userService.getCurrentUser().id
    );
  }

  ngOnInit(): void {}

  navigate(productId: string) {
    this.router.navigateByUrl('dashboard/products/' + productId);
  }
}
