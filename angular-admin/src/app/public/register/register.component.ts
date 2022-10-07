import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: '' | undefined;
  lastName: '' | undefined;
  email: '' | undefined;
  password: '' | undefined;
  password_confirm: '' | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    console.log({
      firstName: this.firstName,
      lastName: this.firstName,
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm,
    })
  }

}
