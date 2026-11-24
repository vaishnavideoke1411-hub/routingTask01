import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/service/user.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { log } from 'console';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userId !: string
  userDetails !: Iuser 
  isInEditMode : boolean = false

  constructor(
    private _routes : ActivatedRoute,
    private _userService : UserService,
    private _router : Router,
    private _matDialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.getSingleUserData()
  }

  getSingleUserData() : void {
    // this.userId = this._routes.snapshot.params['id']
    // if (this.userId) {
    //   this._userService.fetchUserById(this.userId)
    //   .subscribe({
    //     next : res => {
    //         this.userDetails = res
    //         console.log(this.userDetails);
    //         console.log(res);
            
            
    //     },
    //     error : err => {
    //       console.log(err);
          
    //     }
    //   })
      
    // }
// this.userId=this._routes.snapshot.params.g['id']
// if(this.userId){
//   this._userService.fetchUserById(this.userId)
//   .subscribe(res => {
//     this.userObj=res
   
    
//   })
// }

// this._routes.params
// .subscribe((param:Params) => {
//   this.userId=param['id']!
//   if(this.userId){
//     this._userService.fetchUserById(this.userId)
//     .subscribe(res => {
//       this.userDetails=resl
// this.userId = this._routes.snapshot.params['id'] ?? '' ;
this._routes.params.subscribe((param: Params) => {
  if(param['id']){
    this.userId = param['id']
  }
})

if (!this.userId) {
  console.log('User Id not found in route');
  return;
}
// console.log(this.userId)
  this._userService.fetchUserById(this.userId)
    .subscribe({ 
      next : res => {
        this.userDetails = res;
        console.log(res);
      },
      error : err => {
        console.log('Failed to fetch user : ' ,err);
      }
    })
  }

  editUser(){
    this._router.navigate(['edit'],{
      relativeTo:this._routes
    })
    this.isInEditMode = true
  }


  onRemove(){
    let config  = new MatDialogConfig()
    config.data= `Are you sure you want to remove the user Id ${this.userId}`
    config.width = '450px'

    config.disableClose = true

    let matRef = this._matDialog.open(GetConfirmComponent , config)

    matRef.afterClosed()
      
       .pipe(
          tap(res => {
            console.log('Before Filter' , res); 
          }),

          filter(res => res),

          tap(res => {
            console.log('After Filter' , res);
            
          }),

          switchMap(() => {
            return this._userService.removeUser(this.userId)
          })
       )
        .subscribe({
          next : res => {
            console.log(res);
            this._router.navigate(['/users'])
            
          },
          error : err => {
            console.log(err);
            
          }
          
        })
    
  }


  // onRemove(){
  //   let config  = new MatDialogConfig()
  //   config.data= `Are you sure you want to remove the user Id ${this.userId}`
  //   config.width = '450px'

  //   config.disableClose = true

  //   let matRef = this._matDialog.open(GetConfirmComponent , config)

  //   matRef.afterClosed()
  //     .subscribe(res => {
  //       if (res) {
  //         this._userService.removeUser(this.userId)
  //           .subscribe({
  //             next : data => {
  //               // console.log(data);
  //               this._router.navigate(['users'])
                
  //             },
  //             error : err => {
  //               console.log(err);
                
  //             }
  //           })
  //       }
        
  //     })
    
  // }

}
