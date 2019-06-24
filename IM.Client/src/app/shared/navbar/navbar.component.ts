import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginForm : FormGroup;
  constructor(private fb: FormBuilder,private _auth : AuthService,private alertify : AlertifyService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.compose(
        [Validators.required, Validators.minLength(8), Validators.maxLength(12)])]
    });
  }

  getToken(data){
    this._auth.getToken(data).subscribe(() => {
      this.alertify.success("Login Success");
    },(error : any) => {
      this.alertify.error("Error while Login");
    });
  }

  onLogin(data){
    this._auth.login(data).subscribe(() => {
      this.alertify.success("Login Success");
    },(error : any) => {
      this.alertify.error("Error while Login");
    });
  }
  
  loggedin(){
    const token = localStorage.getItem("token");
    return !!token;
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.clear();
    this.alertify.message("Logout Succesful");
  }


}
