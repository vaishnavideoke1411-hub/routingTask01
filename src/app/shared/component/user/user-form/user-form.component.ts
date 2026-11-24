import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  userId!: string;
  isInEditMode: boolean = false;

  constructor(
    private _userService: UserService,
    private _routes: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.formSubmit();

    this.addSkill();

    this.setupAddressSync();

    this._routes.params.subscribe(params => {
      this.userId = params['id'];

      if (this.userId) {
        this.isInEditMode = true;
        this.fetchUserData();
      } else {
        this.isInEditMode = false;
      }
    });
  }

  formSubmit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      role: new FormControl(null, Validators.required),
      userRole: new FormControl(null, Validators.required),
      experience: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      skills: new FormArray([]),
      address: new FormGroup({
        currentAddress: new FormGroup({
          country: new FormControl(null, Validators.required),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, Validators.required)
        }),
        permanentAddress: new FormGroup({
          country: new FormControl(null, Validators.required),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, Validators.required)
        })
      }),
      sameAdd: new FormControl(false),
      imageUrl: new FormControl(null)
    });
  }

  get addressControl(): FormGroup {
    return this.userForm.get('address') as FormGroup;
  }

  get currentAddressControl(): FormGroup {
    return this.userForm.get('address.currentAddress') as FormGroup;
  }

  get permanentAddressControl(): FormGroup {
    return this.userForm.get('address.permanentAddress') as FormGroup;
  }

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  setupAddressSync(): void {
    this.userForm.get('sameAdd')?.valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        this.permanentAddressControl.patchValue(
          this.currentAddressControl.getRawValue()
        );
      }
    });

    this.currentAddressControl.valueChanges.subscribe(() => {
      if (this.userForm.get('sameAdd')?.value) {
        this.permanentAddressControl.patchValue(
          this.currentAddressControl.getRawValue()
        );
      }
    });
  }

  fetchUserData(): void {
    this._userService.fetchUserById(this.userId).subscribe({
      next: (user: any) => {
        if (!user) {
          this._router.navigate(['/user-dashboard']);
          return;
        }

        this.userForm.patchValue({
          name: user.name,
          role: user.role,
          userRole: user.userRole,
          experience: user.experience,
          status: user.status,
          description: user.description,
          address: user.address,
          sameAdd: user.sameAdd ?? false,
          imageUrl: user.imageUrl
        });

        this.skills.clear();

        if (user.skills && user.skills.length) {
          user.skills.forEach((skill: string) => {
            this.skills.push(
              new FormControl(skill, Validators.required)
            );
          });
        } else {
          this.addSkill();
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  addSkill(): void {
    if (this.skills.length === 0 || this.skills.valid) {
      this.skills.push(
        new FormControl('', Validators.required)
      );
    }
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user: Iuser = this.userForm.getRawValue();

    if (this.isInEditMode) {
      this.updateData();
    } else {
      this._userService.postUser(user).subscribe({
        next: () => {
          this.userForm.reset();
          this._router.navigate(['/user-dashboard']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  updateData(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const updatedUser: Iuser = this.userForm.getRawValue();

    this._userService.updateUser(updatedUser, this.userId).subscribe({
      next: () => {
        this._router.navigate(['/user-dashboard', this.userId]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}





// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Iuser } from 'src/app/shared/model/user';
// import { UserService } from 'src/app/shared/service/user.service';

// @Component({
//   selector: 'app-user-form',
//   templateUrl: './user-form.component.html',
//   styleUrls: ['./user-form.component.scss']
// })
// export class UserFormComponent implements OnInit {

//   userForm!: FormGroup;
//   userId!: string;
//   isInEditMode: boolean = false;

//   constructor(
//     private _userService: UserService,
//     private _routes: ActivatedRoute,
//     private _router: Router
//   ) {}

//   ngOnInit(): void {
//     this.formSubmit();
//     this.addSkill();
//     this.setupAddressSync();
//   }

//   formSubmit(): void {
//     this.userForm = new FormGroup({
//       name: new FormControl(null, [
//         Validators.required,
//         Validators.minLength(3)
//       ]),
//       role: new FormControl(null, Validators.required),
//       // userRole : new FormControl(null, Validators.required),
//       experience: new FormControl(null, Validators.required),
//       status: new FormControl(null, Validators.required),
//       description: new FormControl(null, Validators.required),
//       skills: new FormArray([]),
//       address: new FormGroup({
//         currentAddress: new FormGroup({
//           country: new FormControl(null, Validators.required),
//           state: new FormControl(null, Validators.required),
//           city: new FormControl(null, Validators.required),
//           zipcode: new FormControl(null, Validators.required)
//         }),
//         permanentAddress: new FormGroup({
//           country: new FormControl(null, Validators.required),
//           state: new FormControl(null, Validators.required),
//           city: new FormControl(null, Validators.required),
//           zipcode: new FormControl(null, Validators.required)
//         })
//       }),
//       sameAdd: new FormControl(false),
//       imageUrl: new FormControl(null)
//     });
//   }

//   get addressControl(): FormGroup {
//     return this.userForm.get('address') as FormGroup;
//   }

//   get currentAddressControl(): FormGroup {
//     return this.userForm.get('address.currentAddress') as FormGroup;
//   }

//   get permanentAddressControl(): FormGroup {
//     return this.userForm.get('address.permanentAddress') as FormGroup;
//   }

//   get skills(): FormArray {
//     return this.userForm.get('skills') as FormArray;
//   }

//   setupAddressSync(): void {
//     this.userForm.get('sameAdd')?.valueChanges.subscribe((checked: boolean) => {
//       if (checked) {
//         this.permanentAddressControl.patchValue(
//           this.currentAddressControl.getRawValue()
//         );
//       }
//     });

//     this.currentAddressControl.valueChanges.subscribe(() => {
//       if (this.userForm.get('sameAdd')?.value) {
//         this.permanentAddressControl.patchValue(
//           this.currentAddressControl.getRawValue()
//         );
//       }
//     });
//   }

//   addSkill(): void {
//     if (this.skills.valid) {
//       this.skills.push(new FormControl('', Validators.required));
//     }
//   }

//   removeSkill(index: number): void {
//     this.skills.removeAt(index);
//   }

//   submitForm(): void {
//     if (this.userForm.invalid) {
//       this.userForm.markAllAsTouched();
//       return;
//     }

//     const user: Iuser = this.userForm.getRawValue();

//     this._userService.postUser(user).subscribe({
//       next: () => {
//         this.userForm.reset();
//         this._router.navigate(['/user-dashboard']);
//       },
//       error: (err) => {
//         console.error(err);
//       }
//     });
//   }

//   updateData(): void {
    
//   }
// }
