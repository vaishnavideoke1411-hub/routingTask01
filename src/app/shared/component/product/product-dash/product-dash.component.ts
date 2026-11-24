
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/model/product';
import { ProductService } from 'src/app/shared/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.scss']
})
export class ProductDashComponent implements OnInit {

  productArr: IProduct[] = [];

  constructor(
    private _http: ProductService,
    private _router: Router,
    private _route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchProduct();

    
  }

  fetchProduct(): void {
    this._http.fetchProduct().subscribe({
      next: (res) => {
        this.productArr = [];

        if (res) {
          for (const key in res) {
            this.productArr.push({
              ...res[key],
              id: key
            });
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  navigatetoForm(): void {
    this._router.navigate(['/product/add']);
  }

}







// import { Component, OnInit } from '@angular/core';
// import { IProduct } from 'src/app/shared/model/product';
// import { ProductService } from 'src/app/shared/service/product.service';
// import { ActivatedRoute, Router, Params } from '@angular/router';
// // import { AuthService } from 'src/app/auth.service';

// @Component({
//   selector: 'app-product',
//   templateUrl: './product-dash.component.html',
//   styleUrls: ['./product-dash.component.scss'],
// })
// export class ProductDashComponent implements OnInit {
//   productArr: IProduct[] = [];
//   IsinEditMode: boolean = false;

//   constructor(
//     private _http: ProductService,
//     private _route: ActivatedRoute,
//     private _router: Router,
//     // private _authService: AuthService,
//   ) {}

//   ngOnInit(): void {
//     this.fetchProduct();
//     this.updateData();

//     this._route.queryParams.subscribe((param) => {
//       if (param['product']) {
//         const productData = JSON.parse(param['product']);

//         this.productArr.unshift(productData);
//         console.log(productData);
//       }

//       if (param['id']) {
//         const id = param['id'];
//         this.productArr.splice(id, 1);
//       }
//     });
//   }

//   fetchProduct() {
//     this._http.fetchProduct().subscribe({
//       next: (res) => {
//         this.productArr = [];
//         for (const key in res) {
//           this.productArr.push({ ...res[key], id: key });
//         }

//         if (this.productArr.length > 0 && !this._route.firstChild) {
//           this._router.navigate([this.productArr[0].id], {
//             relativeTo: this._route,
//             replaceUrl: true,
//           });
//         }
//       },
//     });
//   }

//   updateData() {
//     let productId = this._route.snapshot.params['id'];
//     this._http.getProductDataObs$
//     .subscribe({
//       next: (res) => {
//         const product = res[0];
//         let getIndex = this.productArr.findIndex((data) => data.id === product.id);

//         if (getIndex !== -1) {
//           this.productArr[getIndex] = product;
//         }

//         if (this.productArr.length > 0) {
//           this._router.navigate([this.productArr[0].id], {
//             relativeTo: this._route,
//             replaceUrl: true,
//           });
//         }
//       },
//     });
//   }

//   navigatetoForm() {
//     this._router.navigate(['add'], {
//       relativeTo: this._route,
//     });
//   }

//   // signOut() {
//   //   this._authService.logout();

//   //   this._router.navigate(['../']);
//   // }
// }