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
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId')!;
    console.log(this.productId);

    this.product$ = this.productService.get(this.productId);
  }

  ngOnInit(): void {}

  buyProduct() {
    this.productService
      .buyItem(this.productId, this.userService.getCurrentUser().id)
      .subscribe((res) => {
        console.log('product bought', res);
        location.reload();
      });
  }
}
