import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/services/staff/staff.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private staffAddForm : FormGroup;
  index:any;
  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute,
    private staffService : StaffService,private alertify : AlertifyService) { 
    this.route.params.subscribe(params => {
      debugger;
      this.index= params['id'];
      if (this.index && this.index != null && this.index != undefined) {
        this.getStaffDetails(this.index);
      }else{
        this.createForm(null);
      }
    })

  }


  getStaffDetails(index:number){
    let studentDetail = this.staffService.getStaffDetails(index);
    this.createForm(studentDetail);
  }

  ngOnInit() {
  }

  createForm(data){
    if (data == null) {
      this.staffAddForm = this.formBuilder.group({
        first_name: ['',  [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
        last_name: ['',  [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
        phone: ['',  [Validators.required]],
        email: ['',  [Validators.required]]
      });			
    }else{
      this.staffAddForm = this.formBuilder.group({
        first_name: [data.staffData.first_name,  [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
        last_name: [data.staffData.last_name,  [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
        phone: [data.staffData.phone,  [Validators.required]],
        email: [data.staffData.email, [Validators.required]]
      });
    }
  }

  doRegister(){
    if (this.index && this.index != null && this.index != undefined) {
      this.staffAddForm.value.id = this.index
    }else{
      this.index = null;
    }
    let studentRegister = this.staffService.doRegisterStaff(this.staffAddForm.value, this.index);
    if(studentRegister) {
      if (studentRegister.code == 200) {
        this.alertify.success("Success");
        this.router.navigate(['/admin/list']);
      }else{
        this.alertify.error("Failed");
      }
    }
  }
}
