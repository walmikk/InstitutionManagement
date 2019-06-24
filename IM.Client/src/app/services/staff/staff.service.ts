import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../model/Student';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  
  constructor(private _http: HttpClient) { }

  private baseUrl: string = "http://localhost:64406/api/Staffs/";
  private staffListNew:Student[];
  private staffListJson:any;

  getAllStaffsNew(){
    let staffList:any;
    
    return this._http.get<any>(this.baseUrl).pipe(
      map((respone : any) => {
        this.staffListJson = respone;
        if(this.staffListJson && this.staffListJson != '') {
          staffList = {
            code : 200,
            message : "Staffs List Fetched Successfully",
            data : this.staffListJson
          }
        }else{
          staffList = {
            code : 200,
            message : "Staffs List Fetched Successfully",
            data : this.staffListJson
          }
        }
        console.log(this.staffListJson);
      })
    );

    return this._http.get(this.baseUrl).subscribe((res : any) => {
        this.staffListJson = res;
        if(this.staffListJson && this.staffListJson != '') {
          staffList = {
            code : 200,
            message : "Staffs List Fetched Successfully",
            data : this.staffListJson
          }
        }else{
          staffList = {
            code : 200,
            message : "Staffs List Fetched Successfully",
            data : this.staffListJson
          }
        }
        console.log(this.staffListJson);
    });
    debugger;
    
    return staffList;
  }

  getAllStaffs(){
    let staffList:any;
    if(localStorage.getItem('staffs') && localStorage.getItem('staffs') != '') {
      staffList = {
        code : 200,
        message : "Staffs List Fetched Successfully",
        data : JSON.parse(localStorage.getItem('staffs'))
      }
    }else{
      staffList = {
        code : 200,
        message : "Staffs List Fetched Successfully",
        data : JSON.parse(localStorage.getItem('staffs'))
      }
    }
    return staffList;
  }

  doRegisterStaff(data, index){
    let staffList = JSON.parse(localStorage.getItem('staffs'));
    let returnData;
    console.log("index", index);
    if(index != null) {


      for (var i = 0; i < staffList.length; i++) {
        if (index != i && staffList[i].email == data.email) {
          returnData = {
            code : 503,
            message : "Email Address Already In Use",
            data : null
          }    
          return returnData;
        }
      }

      staffList[index] = data;
      localStorage.setItem('staffs',JSON.stringify(staffList));
      returnData = {
        code : 200,
        message : "Staff Successfully Updated",
        data : JSON.parse(localStorage.getItem('staffs'))
      }    
    }else{      
      data.id = this.generateRandomID();
      for (var i = 0; i < staffList.length; i++) {
        if (staffList[i].email == data.email) {
          returnData = {
            code : 503,
            message : "Email Address Already In Use",
            data : null
          }    
          return returnData;
        }
      }
      staffList.unshift(data);

      localStorage.setItem('staffs',JSON.stringify(staffList));

      returnData = {
        code : 200,
        message : "Staff Successfully Added",
        data : JSON.parse(localStorage.getItem('staffs'))
      }    
    }
    return returnData;
  }

  deleteStaff(index:number){
    let staffList = JSON.parse(localStorage.getItem('staffs'));

    staffList.splice(index, 1);

    localStorage.setItem('staffs',JSON.stringify(staffList));

    let returnData = {
      code : 200,
      message : "Staff Successfully Deleted",
      data : JSON.parse(localStorage.getItem('staffs'))
    }

    return returnData;
  }



  getStaffDetails(index:number){
    let staffList = JSON.parse(localStorage.getItem('staffs'));

    let returnData = {
      code : 200,
      message : "Staff Details Fetched",
      staffData : staffList[index]
    }

    return returnData;
  }


  generateRandomID() {
    var x = Math.floor((Math.random() * Math.random() * 9999));
    return x;
  }
}
