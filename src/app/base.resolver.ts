import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseResolver<T> implements Resolve<T> {
  abstract resolvedata(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<T>
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> {
    return this.resolvedata(route, state)
  }
}
