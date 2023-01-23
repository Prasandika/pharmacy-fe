import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.css'],
})
export class ProductListAdminComponent implements OnInit {
  products$: Observable<Product[]>;
  @Output() edited: EventEmitter<Product> = new EventEmitter();
  constructor(
    private readonly productService: ProductService,
    private readonly toastrService: ToastrService
  ) {
    this.products$ = this.productService.getAll();
  }

  ngOnInit(): void {}

  edit(product: Product) {
    this.edited.emit(product);
  }

  delete(productId: string) {
    this.productService.delete(productId).subscribe((res) => {
      this.toastrService.success('Deleted');
      this.products$ = this.productService.getAll();
    });
  }
}
