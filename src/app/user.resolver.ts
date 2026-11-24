import { inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BaseResolver } from './base.resolver';
import { Iuser } from './shared/model/user';
import { UserService } from './shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver extends BaseResolver<Iuser | Iuser[]> {
  
private userService = inject(UserService)
  override resolvedata(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iuser | Iuser[]> {
    let userId = route.paramMap.get('id')

    if (userId) {
      return this.userService.fetchUserById(userId)

    }
    return this.userService.fetchUser()

  }
}
