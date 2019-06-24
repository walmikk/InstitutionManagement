import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private readonly APIURL:string = "";
  constructor(private http:HttpClient) { }

  private getToken(){
    return this.http.post<string>(`$(this.APIURL)/token={APIURL}`,{
      headers:{

        "Content-type":""
      }
    })

  }

  ngOnInit() {
  }

}
