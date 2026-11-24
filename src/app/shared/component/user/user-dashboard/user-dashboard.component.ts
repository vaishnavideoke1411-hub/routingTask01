import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  users : Iuser[] = []

  constructor(
    private _userService : UserService,
    private _router : Router,
    private _routes : ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.fetchUserArr()

    this._routes.data.subscribe({
      next : res => {
        if (res['users']) {
          this.users = res['users']
        }
      }
    })
  }

  fetchUserArr(){
    this._userService.fetchUser()
      .subscribe({
        next : res => {
          for (const key in res) {
          this.users.push({...res[key], id:key})
        }
        console.log(this.users);
  
        }, 
        error : err => {
          console.log(err);
          
        }
      })
  }



  // navigatetouser(user : Iuser): void{
  //   this._router.navigate([user.uid] , 
  //         {relativeTo : this._routes}
  //   )
  // }
}
