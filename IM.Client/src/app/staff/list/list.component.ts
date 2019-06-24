import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff/staff.service';
import { ToastrService } from 'ngx-toastr';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  staffList:any;
 	staffListData:any;
 	constructor(private staffService:StaffService,private alertify: AlertifyService) { }
 	// Call staff list function on page load 
 	ngOnInit() {
 		this.getStaffList();
 	}

 	// Get staff list from services
 	getStaffList(){
 		let staffList = this.staffService.getAllStaffs();
 		this.success(staffList)
 	}

 	// Get staff list success
 	success(data){
 		this.staffListData = data.data;
 		for (var i = 0; i < this.staffListData.length; i++) {
 			this.staffListData[i].name = this.staffListData[i].first_name +' '+ this.staffListData[i].last_name;
 		}
 	}

 	// Delete a staff with its index
 	deleteStaff(index:number){
 		// get confirm box for confirmation
 		let r = confirm("Are you sure?");
 		if (r == true) {
 			let staffDelete = this.staffService.deleteStaff(index);
 			if(staffDelete) {
 				this.alertify.success("Staff Deleted");
 			} 
 			this.getStaffList();
 		}
 	}
}
