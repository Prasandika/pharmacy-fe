import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]>;
  constructor(
    private readonly productService: ProductService,
    private router: Router
  ) {
    this.products$ = this.productService.getAll();
  }

  ngOnInit(): void {}

  navigate(productId: string) {
    this.router.navigateByUrl('dashboard/products/' + productId);
  }

  productBought(product: Product) {
    return product.boughtUserId == null;
  }
}
