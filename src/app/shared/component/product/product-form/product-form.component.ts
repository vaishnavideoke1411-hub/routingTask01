import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/model/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup;
  productID!: string;
  IsinEditMode: boolean = false;

  constructor(
    private _http: ProductService,
    private _routes: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formSubmit();

    this.productID = this._route.snapshot.params['id'];

    if (this.productID) {
      this.IsinEditMode = true;
      this.patchValue();
    }
  }

  formSubmit(): void {
    this.productForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
      price: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required]),
      status: new FormControl('Available', [Validators.required])
    });
  }

  patchValue(): void {
    this._http.fetchSingleProduct(this.productID).subscribe({
      next: (res) => {
        if (res) {
          this.productForm.patchValue({
            title: res.title,
            brand: res.brand,
            category: res.category,
            description: res.description,
            image: res.image,
            price: res.price,
            quantity: res.rating?.count,
            rating: res.rating?.rate,
            status: res.status || 'Available'
          });
          this.IsinEditMode = true;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  submitForm(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;
    const productObj: IProduct = {
      title: formValue.title,
      brand: formValue.brand,
      category: formValue.category,
      description: formValue.description,
      image: formValue.image,
      price: Number(formValue.price),
      rating: {
        rate: Number(formValue.rating),
        count: Number(formValue.quantity)
      },
      status: formValue.status
    };

    this._http.addProduct(productObj).subscribe({
      next: (res) => {
        console.log('Product added successfully', res);
        this.productForm.reset({ status: 'Available' });
        this._routes.navigate(['/product']);
      },
      error: (err) => {
        console.log('Error while adding product', err);
      }
    });
  }

  updateValue(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;
    const updateObj: IProduct = {
      title: formValue.title,
      brand: formValue.brand,
      category: formValue.category,
      description: formValue.description,
      image: formValue.image,
      price: Number(formValue.price),
      rating: {
        rate: Number(formValue.rating),
        count: Number(formValue.quantity)
      },
      status: formValue.status,
      id: this.productID
    };

    this._http.updateProductData(updateObj).subscribe({
      next: () => {
        this._routes.navigate(['/product', this.productID]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  get controls() {
    return this.productForm.controls;
  }
}