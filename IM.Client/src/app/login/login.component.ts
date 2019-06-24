import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm : FormGroup;
  constructor(private formBuilder: FormBuilder, private _auth: AuthService,
    private alertify: AlertifyService, private route: Router) {
    this.loginForm = this.formBuilder.group({
			email: ['',  [Validators.required]],
			password: ['',[Validators.required]]
		});
   }

  ngOnInit() {
  }

  doLogin(){
		let login = this._auth.doAdminLogin(this.loginForm.value);
    this.success(login);
  }
  
  success(data){
    debugger;
		if (data.code == 200) {
			localStorage.setItem('userData', JSON.stringify(data.data));
      this.route.navigate(['/admin/list']);
			this.alertify.success("Logged In Successfully");
		}else{
			this.alertify.error( "Invalid Credentials");
		}
	}
    
}
