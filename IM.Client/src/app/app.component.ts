import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'insstitutionApp';

  staffsList = [
    {	
      id : 1,
      first_name : "Walmik",
      last_name : "Kanmahale",
      email : "walmikk@hexaware.com",
      phone : 8898016016,
      department : "IT"
    },
    {
      id : 2,
      first_name : "Vivek",
      last_name : "Tiwari",
      email : "vivekt@hexaware.com",
      phone : 8797987789,
      department : "Commerce"
    },
    {
      id : 3,
      first_name : "Kaushik",
      last_name : "Jethva",
      email : "kaushikj@hexaware.com",
      phone : 9852464652,
      department : "Science"
    },
    {
      id : 4,
      first_name : "Siddhesh",
      last_name : "Rasam",
      email : "siddheshr@hexaware.com",
      phone : 9685589748,
      department : "Arts"
    }
    ];

    constructor() {
      // Save staffs to localStorage
      localStorage.setItem('staffs', JSON.stringify(this.staffsList));
    }
}
