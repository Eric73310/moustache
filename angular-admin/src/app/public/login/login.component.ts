import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexEnum } from 'src/app/enums/regex';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./../public.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { 

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', {
        validators: [Validators.required, Validators.email]
      }),
      password: this.formBuilder.control('', {
        validators: [Validators.required, Validators.pattern(RegexEnum.PASSWORD)]
      }),
    });
  }

  submit(): void {
    this.authService.login(this.form.getRawValue())
   .subscribe(() => this.router.navigate(['/']));
    };
  }
  

