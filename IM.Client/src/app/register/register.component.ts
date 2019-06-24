import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  rForm : FormGroup
  constructor(private fb: FormBuilder,private _auth: AuthService,private alertify : AlertifyService,private router : Router) { }

  ngOnInit() {
    this.onFormCreate();
  }

  onFormCreate() {
    this.rForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.compose(
        [Validators.required, Validators.minLength(8), Validators.maxLength(12)])],
      // 'contactnumber':['',Validators.compose(
      //   [Validators.required, Validators.pattern('[6-9]\\d{9}')])],
        'contactno': ['', Validators.required],
        'firstname': ['', Validators.required],
        'lastname': ['', Validators.required],
        'address': ['', Validators.compose(
          [Validators.required,Validators.maxLength(100)]
        )],
        'dateofbirth': ['', Validators.required],
        
    })
  }

  onLogin(data) {
    this._auth.registerUser(data).subscribe((response:any) => {
      this.alertify.success("Registration Succesful")
      this.router.navigate(['/home']);
    }, (error: any) => this.alertify.error("Error : " + error)
    );
     localStorage.setItem('username',data.username);
  }
}
