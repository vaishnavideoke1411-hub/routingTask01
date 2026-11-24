
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/model/product';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit {

  productId!: string;
  productObj!: IProduct;

  constructor(
    private _http: ProductService,
    private _route: ActivatedRoute,
    private _routes: Router
  ) { }

  ngOnInit(): void {
    this.getProductByID();
  }

  getProductByID(): void {

    this._route.params.subscribe((param) => {

      this.productId = param['id'];

      this._http.fetchSingleProduct(this.productId).subscribe({
        next: (res) => {

          if (res) {
            this.productObj = {
              ...res,
              id: this.productId
            };
          } else {
            this._routes.navigate(['/product']);
          }

        },
        error: () => {
          this._routes.navigate(['/product']);
        }
      });

    });
  }

  editProduct(): void {
    this._routes.navigate(['/product', this.productId, 'edit']);
  }

  removeData(id: string | undefined): void {

    if (!id) {
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {

      this._http.removeProducts(id).subscribe({
        next: () => {
          this._routes.navigate(['/product']);
        },
        error: (err) => {
          console.log(err);
        }
      });

    }
  }

}






// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { IProduct } from 'src/app/shared/model/product';
// import { ProductService } from 'src/app/shared/service/product.service';

// @Component({
//   selector: 'app-product-information',
//   templateUrl: './product-information.component.html',
//   styleUrls: ['./product-information.component.scss']
// })
// export class ProductInformationComponent implements OnInit {
//   productId!: string;
//   productObj!: IProduct;

//   constructor(
//     private _http: ProductService,
//     private _route: ActivatedRoute,
//     private _routes: Router,
//   ) {}

//   ngOnInit(): void {
//     this.getProductByID();
//   }

//   getProductByID() {
//     // const productId = this._route.snapshot.paramMap.get('id');

//     this._route.params.subscribe((param: Params) => {
//       this.productId = param['id'];
//       if (this.productId === null) {
//         return;
//       }

//       this._http.fetchSingleProduct(this.productId).subscribe({
//         next: (res) => {
//           this.productObj = {
//             ...res,
//             id: this.productId,
//           };
//         },
//       });
//     });
//   }

//   editProduct() {
//     this._routes.navigate(['product', this.productId, 'edit']);
//   }

//   removeData(id: string) {
//     console.log(id);

//     this._http.removeProducts(id).subscribe({
//       next: (res) => {
//         this._routes.navigate(['product'], {
//           queryParams: {
//             id: id,
//           },
//         });
//       },
//     });
//   }
// }
