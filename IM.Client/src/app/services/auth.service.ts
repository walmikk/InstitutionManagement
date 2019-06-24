import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:53945/api/Identity/";
  constructor(private _http : HttpClient) { }
  userName:string;

  getToken(model:any) : Observable<string> {
    return this._http.post<string>(`${this.baseUrl}/token`,model,{
      headers:{
        "content-type" : "application/json",
        "Accept" : "application/json"
      }
    })
  }

  login(model:any){
    return this._http.post(this.baseUrl + 'token',model).pipe(
      map((respone : any) => {
        const user = respone;
        if(user){
          localStorage.setItem('token', user);
        }
      })
    );
  }

  doAdminLogin(data){
		if (data.email == "test@gmail.com" && data.password == "admin123") {
			return {
				code : 200,
				message : "Login Successful",
				data : data
			};
		}else{
			return {
				code : 503,
				message : "Invalid Credentials",
				data : null
			};
		}
	}

  public registerUser(rForm:any)  {
    const header = new Headers();
    return this._http.post(this.baseUrl, rForm).pipe(
      map((response : any) => {
        const userModel = response;
        if(userModel){
          localStorage.setItem('currentUser', JSON.stringify(userModel));
        }
      })
    );;
    

  }
}
