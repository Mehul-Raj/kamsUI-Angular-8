import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { StorageService } from '../shared/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in-body',
  templateUrl: './log-in-body.component.html',
  styleUrls: ['./log-in-body.component.css'],
  providers: [LoginService, StorageService]
})
export class LogInBodyComponent implements OnInit {

  loginForm: FormGroup;
  showLoginForm: boolean = false;
  loginSubscription$: Subscription;
  setMessage: any = {};
  get f(): any { return this.loginForm.controls; }
  constructor(private formBuilder: FormBuilder,
    private router: Router, private _loginService: LoginService, private _storage: StorageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userPwd: ['', [Validators.required, Validators.minLength(1)]],
      eMail: ['', Validators.required]
    });
  }

  //Togel Login Form Ang Forget Password Form
  showLogin() {
    this.showLoginForm = !this.showLoginForm;
  }

  //Check Login
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginSubscription$ = this._loginService.checkUserLogin(this.loginForm.value).subscribe(resp => {
      let userEmail = resp.eMail;
      if (resp.status.toUpperCase() == 'SUCCESS') {
        if (resp.userRole.toUpperCase() == 'ROLE_ADMIN') {
          this._storage.setSession('isAuthenticated', true);
          this._storage.setSession('eMail', userEmail);
          console.log("email Is ",this._storage.getSession('eMail'))
          this.router.navigate(['/admin']);
        }
        if (resp.userRole.toUpperCase() == 'ROLE_USER' || resp.userRole.toUpperCase() == 'ROLE_MANAGER' || resp.userRole == 'ROLE_TEAMLEAD') {
          this._storage.setSession("isAuthenticated", true);
          this._storage.setSession('eMail', userEmail);
          this.router.navigate(['/user']);
        } else {
          this.setMessage = { message: resp.errorMessage, error: true };
        }
      }
      else {
        this.setMessage = { message: resp.msg, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }
}
