import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _route: Router,
    private _http: AuthService
  ) { }

  ngOnInit(): void {
  }


  logOut(){
    this._http.logout();
    this._route.navigate(['/']);

  }
}
