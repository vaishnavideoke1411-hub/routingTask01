
import { Injectable } from '@angular/core';
import { Iuser } from '../model/user';
import { map, Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Iuser[] = [];
  BASE_URL: string = environment.BASE_Url;
  USER_URL: string = `${this.BASE_URL}/users.json`;

  constructor(
    private _http: HttpClient
  ) {}

  fetchUser(): Observable<any> {
    return this._http.get<any>(this.USER_URL).pipe(
      map(res =>{
        let userArr =[]

        for (const key in res) {
          
          userArr.unshift({...res[key],id:key})
        }

        return userArr
      })
    )
                
  }

  fetchUserById(id: string): Observable<Iuser> {
    let getURL = `${this.BASE_URL}/users/${id}.json`;
    return this._http.get<Iuser>(getURL);
  }

  postUser(user: Iuser): Observable<any> {
    return this._http.post<any>(this.USER_URL, user);
  }

  updateUser(user: Partial<Iuser>, userId: string): Observable<any> {
    return this._http.patch(
      `${this.BASE_URL}/users/${userId}.json`,
      user
    );
  }

  removeUser(id: string): Observable<any> {
    
    let REMOVE_URL = `${this.BASE_URL}/users/${id}.json`
    return this._http.delete(REMOVE_URL)
  }
}
