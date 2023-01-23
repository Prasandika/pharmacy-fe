import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../../services/product/product.service';
import { Product } from './../../../models/product.model';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { __values } from 'tslib';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  formGroup: FormGroup;
  @Input() product!: Product;
  imageUrl!: string;
  isOnEdit: boolean = false;

  isUploading: boolean = false;

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage: number = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toast: ToastrService,
    private uploadService: FileUploadService
  ) {
    this.formGroup = this.fb.group({
      id: new FormControl(null),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      boughtUserId: new FormControl(null),
      price: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.formGroup.controls.imageUrl.setValue(this.imageUrl);
    if (this.isOnEdit) {
      this.productService.update(this.formGroup.value).subscribe((res) => {
        this.toast.success('Product updated');
        location.reload();
      });
    } else {
      this.productService.create(this.formGroup.value).subscribe((res) => {
        this.toast.success('Product added');
        location.reload();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let product = changes.product.currentValue;
    if (product) {
      delete product['__v'];
      delete product['_id'];
      this.formGroup.setValue(product);
      this.isOnEdit = true;
    }
  }

  resetEdit() {
    this.isOnEdit = false;
    this.formGroup.reset();
    this.imageUrl = '';
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);

        let fileName = String(
          new Date().toISOString().slice(0, 10) + Date.now()
        );

        this.isUploading = true;

        this.uploadService
          .pushFileToStorage(this.currentFileUpload, fileName)
          .subscribe(
            (percentage) => {
              this.percentage = Math.round(percentage ? percentage : 0);
            },
            (error) => {
              console.log(error);
            },
            () => {
              this.uploadService.downloadURL.subscribe((url: string) => {
                if (url) {
                  console.log('subs url', url);
                  this.imageUrl = url;
                  this.isUploading = false;
                  // this.currentEvent.imageURL = url;
                  //this.updateImageURL(this.user.id, url);
                  this.uploadService.downloadURL.next('');

                  this.currentFileUpload = undefined;
                }
              });
            }
          );
      }
    }
  }
}
