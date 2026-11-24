
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../model/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL: string = environment.BASE_Url;
  PRODUCT_URL: string = `${this.BASE_URL}/products.json`;

  prodBehaviourSub$: BehaviorSubject<IProduct[]> =
    new BehaviorSubject<IProduct[]>([]);

  constructor(private _http: HttpClient) { }

  getProductDataObs$: Observable<IProduct[]> =
    this.prodBehaviourSub$.asObservable();

  emitProduct(product: IProduct[]): void {
    this.prodBehaviourSub$.next(product);
  }

  fetchProduct(): Observable<any> {
    return this._http.get<any>(this.PRODUCT_URL);
  }

  fetchSingleProduct(id: string): Observable<IProduct> {
    return this._http.get<IProduct>(
      `${this.BASE_URL}/products/${id}.json`
    );
  }

  addProduct(product: IProduct): Observable<any> {
    return this._http.post<any>(this.PRODUCT_URL, product);
  }

  updateProductData(product: IProduct): Observable<any> {
    return this._http.patch<any>(
      `${this.BASE_URL}/products/${product.id}.json`,
      product
    );
  }

  removeProducts(id: string): Observable<any> {
    return this._http.delete<any>(
      `${this.BASE_URL}/products/${id}.json`
    );
  }
}




// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { IProduct } from '../model/product';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   // products : IProduct[] = []
//   BASE_URL : string = environment.BASE_Url
//   PRODUCT_URL : string = `${this.BASE_URL}/products.json`

//   prodBehaviourSub$ : BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([])

//   constructor(private _http : HttpClient) { }

//   getProductDataObs$: Observable<IProduct[]> = this.prodBehaviourSub$.asObservable()

//   emitProduct(product : IProduct[]): void{
//     this.prodBehaviourSub$.next(product)
//   }

//   fetchProduct() : Observable<any>{
//     return this._http.get<any>(this.PRODUCT_URL)
//   }

//   fetchSingleProduct(id : string): Observable<IProduct>{
//     return this._http.get<IProduct>(`${this.BASE_URL}/products/${id}.json`)
//   }

//   addProduct(product: IProduct): Observable<any>{
//     return this._http.post<any>(this.PRODUCT_URL, product)
//   }

//   updateProductData(product: IProduct): Observable<IProduct>{
//     return this._http.patch<IProduct>(`${this.BASE_URL}/products/${product.id}.json`, product)
//   }

//   removeProducts(id:string): Observable<any>{
//     return this._http.delete<any>(`${this.BASE_URL}/products/${id}.json`)
//   }
// }



