  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AuthService } from '../../service/auth.service';
  import { registerUser, userLogin, userRole } from '../../model/auth';

  @Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
  })
  export class AuthComponent implements OnInit {

    hasLogin = false;
    showPassword = false;
    loginForm!: FormGroup;
    signupForm!: FormGroup;

    constructor(
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _http: AuthService
    ) { }

    ngOnInit(): void {
      this.loginForm = this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });

      this.signupForm = this._formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        userRole: ['buyer' as userRole, [Validators.required]]
      });
    }

    switchMode(): void {
      this.hasLogin = !this.hasLogin;
      this.showPassword = false;
    }

    submitLogin(): void {
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
      }

      let newObj: userLogin = this.loginForm.value;
      this._http.loginUser(newObj).subscribe({
        next: res => {
          console.log(res);
          const token = (res as any).token;
          if(token){
            this._http.setToken(token)
            this._http.setUserRole((res as any).userRole)
        this._router.navigate(['/product']);  
          } else {
      console.log('Token not received from API');
    }
        },
        error : err => {
          console.log(err)
        }
      })

    }

    submitSignup(): void {
      if (this.signupForm.invalid) {
        this.signupForm.markAllAsTouched();
        return;
      }

      const newObj: registerUser = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        userRole: this.signupForm.value.userRole
      };

      this._http.signUpUser(newObj).subscribe({
        next: res =>{
         this.loginForm.reset();
        this.loginForm.patchValue({
          email: newObj.email
        });

        this.signupForm.reset({
          userRole: 'buyer'
        });

        this.hasLogin = true;
        this.showPassword = false;

        },
        error : err => {
          console.log(err)
        }
      })

      // this.hasLogin = true;
      // this.loginForm.reset();
      // this.loginForm.patchValue({ email: this.signupForm.value.email });
    }

    get loginControls() {
      return this.loginForm.controls;
    }

    get signupControls() {
      return this.signupForm.controls;
    }
  }
