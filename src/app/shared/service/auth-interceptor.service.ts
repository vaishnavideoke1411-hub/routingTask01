import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  private _spinnerService = inject(SpinnerService)
  constructor() { }

  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // API request call :: Spinner Start
    this._spinnerService.show()
    const reqClone = req.clone({
      setHeaders : {
        auth : "Token..."
      }
    })
    return next.handle(reqClone)
        .pipe(
            finalize(() => {
                // It confirms the API call is complete then we got the response.
                // Hide spinner
              this._spinnerService.hide()
            })
        )
      
  }
}
