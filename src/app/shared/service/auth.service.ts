import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { registerUser, userLogin } from '../model/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _BasaUrl = environment.authBaseUrl
  constructor(private _http: HttpClient) { }

  private isLoggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }


  loginUser(user: userLogin):Observable<userLogin>{
return this._http.post<userLogin>(`${this._BasaUrl}/api/auth/login`,user)
  }

  signUpUser(user: registerUser):Observable<registerUser>{
return this._http.post<registerUser>(`${this._BasaUrl}/api/auth/register`,user)
  }

  setToken(token:string){
localStorage.setItem('token',token)
this.isLoggedInSubject.next(true);
  }

  getToken(){
  return localStorage.getItem('token')
  }

  setUserRole(userRole: string){
localStorage.setItem('userRole',userRole)

  }

  getUserRole(){
   return localStorage.getItem('userRole')
  }

}
