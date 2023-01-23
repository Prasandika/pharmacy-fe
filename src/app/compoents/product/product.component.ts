import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  editingProduct!: Product;
  constructor() {}

  ngOnInit(): void {}

  editProduct(product: Product) {
    this.editingProduct = product;
  }
}
