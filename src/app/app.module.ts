import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormComponent } from './shared/component/user/user-form/user-form.component';
import { UserDetailsComponent } from './shared/component/user/user-details/user-details.component';

import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { HomeComponent } from './shared/component/home/home.component';
import { MaterialModule } from './shared/material/material.module';
import { UserDashboardComponent } from './shared/component/user/user-dashboard/user-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductDashComponent } from './shared/component/product/product-dash/product-dash.component';
import { ProductFormComponent } from './shared/component/product/product-form/product-form.component';
import { ProductInformationComponent } from './shared/component/product/product-information/product-information.component';
import { MatChipsModule } from '@angular/material/chips';
import { AuthComponent } from './shared/component/auth/auth.component';
import { GetConfirmComponent } from './shared/component/get-confirm/get-confirm.component';
import { AuthInterceptorService } from './shared/service/auth-interceptor.service';
import { FairsComponent } from './shared/component/fairs/fairs.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserDetailsComponent,
    NavbarComponent,
    HomeComponent,
    UserDashboardComponent,
    ProductDashComponent,
    ProductFormComponent,
    ProductInformationComponent,
    AuthComponent,
    GetConfirmComponent,
    FairsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatChipsModule,

  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
