import { Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from './shared/service/spinner.service';
import { Observable } from 'rxjs';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 
  
  title = 'routing-1';
  isLoding:boolean =false

  private _service=inject(SpinnerService)
  
  private _authService=inject(AuthService)

  isLoding$:Observable<boolean> = this._service.loader$
  isLoggedIn$ = this._authService.isLoggedIn$

   ngOnInit(): void {
    this.isLoding$.subscribe(res =>{
      this.isLoding = res
    })
  }

  
}
