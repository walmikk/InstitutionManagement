import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TopComponent } from './shared/top/top.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { Authinterceptor } from './services/interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertifyService } from './services/alertify.service';
import { ListComponent } from './staff/list/list.component';
import { AddComponent } from './staff/add/add.component';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    TopComponent,
    RegisterComponent,
    LoginComponent,
    AuthComponent,
    ListComponent,
    AddComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AlertifyService, {provide:HTTP_INTERCEPTORS,useClass : Authinterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
