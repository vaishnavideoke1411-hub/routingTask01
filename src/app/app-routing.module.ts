import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/component/home/home.component';
import { UserFormComponent } from './shared/component/user/user-form/user-form.component';
import { UserDetailsComponent } from './shared/component/user/user-details/user-details.component';
import { UserDashboardComponent } from './shared/component/user/user-dashboard/user-dashboard.component';

import { ProductFormComponent } from './shared/component/product/product-form/product-form.component';
import { ProductDashComponent } from './shared/component/product/product-dash/product-dash.component';
import { ProductInformationComponent } from './shared/component/product/product-information/product-information.component';
import { AuthComponent } from './shared/component/auth/auth.component';
import { AuthGuard } from './shared/gaurd/auth.guard';
import { FairsComponent } from './shared/component/fairs/fairs.component';
import { UserRoleGuard } from './shared/gaurd/user-role.guard';
import { UserResolver } from './user.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard,UserRoleGuard],
    data:{
      userRole : ['buyer','admin','superAdmin']
    }
  },
  {
    path: 'product',
    component: ProductDashComponent,
    canActivate: [AuthGuard,UserRoleGuard],
    children: [
      {
        path: 'add',
        component: ProductFormComponent
      },
      {
        path: ':id',
        component: ProductInformationComponent
      },
      {
        path: ':id/edit',
        component: ProductFormComponent
      },
    ],
    data:{
      userRole : ['buyer','admin','superAdmin']
    }
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard,UserRoleGuard],
    children: [
      {
        path: 'add',
        component: UserFormComponent
      },
      {
        path: ':id',
        component: UserDetailsComponent,
        resolve : {
          user : UserResolver
        }

      },
       {
        path: ':id/edit',
        component: UserFormComponent
      },
    ],
    data:{
      userRole : ['admin','superAdmin']
    },
    resolve : {
      users : UserResolver
    }
  },
  {
    path: 'fairs',
    component: FairsComponent,
    canActivate: [AuthGuard,UserRoleGuard],
     data:{
      userRole : ['superAdmin']
    }
  },

  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}






// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './shared/component/home/home.component';
// import { UserFormComponent } from './shared/component/user/user-form/user-form.component';
// import { UserDetailsComponent } from './shared/component/user/user-details/user-details.component';
// import { UserDashboardComponent } from './shared/component/user/user-dashboard/user-dashboard.component';
// import { ProductFormComponent } from './shared/component/product/product-form/product-form.component';
// import { ProductDashComponent } from './shared/component/product/product-dash/product-dash.component';
// import { ProductInformationComponent } from './shared/component/product/product-information/product-information.component';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full'
//   },
//   {
//     path: 'home',
//     component: HomeComponent
//   },
//   {
//     path: 'product',
//     component: ProductDashComponent
//   },
//   {
//     path: 'product/add',
//     component: ProductFormComponent
//   },
//   {
//     path: 'product/:id/edit',
//     component: ProductFormComponent
//   },
//   {
//     path: 'product/:id',
//     component: ProductInformationComponent
//   },
//   {
//     path: 'product-form',
//     component: ProductFormComponent
//   },
//   {
//     path: 'user',
//     component: UserDashboardComponent
//   },
//   {
//     path: 'user-form',
//     component: UserFormComponent
//   },
//   {
//     path: 'user/add',
//     component: UserFormComponent
//   },
//   {
//     path: 'user/:id',
//     component: UserDetailsComponent
//   },
//   {
//     path: 'user/:id/edit',
//     component: UserFormComponent
//   },
//   {
//     path: '**',
//     redirectTo: 'home'
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
