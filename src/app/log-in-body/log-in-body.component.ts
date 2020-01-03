import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in-body',
  templateUrl: './log-in-body.component.html',
  styleUrls: ['./log-in-body.component.css']
})
export class LogInBodyComponent implements OnInit {

  loginForm: FormGroup;
  disableBtn = false;
  showLoginForm: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router) {
    setTimeout(() => {
      this.disableBtn = true;
    }, 3000);

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required]
    });
  }
  showLogin() {
    this.showLoginForm = !this.showLoginForm;
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.value.email == 'admin') {
      this.router.navigate(['/dashboard/admin/domain']);
    }
  }
}
