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
  OTPForm: FormGroup;
  validate: FormGroup;
  showLoginForm: boolean = false;
  loginSubscription$: Subscription;
  setMessage: any = {};
  enterNewPassword: boolean = false;
  loading: boolean = false;
  getOtpButton: boolean = true;

  get f(): any { return this.loginForm.controls; }
  constructor(private formBuilder: FormBuilder,
    private router: Router, private _loginService: LoginService, private _storage: StorageService, private formBuilder2: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userPwd: ['', [Validators.required, Validators.minLength(1)]],
      eMail: ['', Validators.required]
    });
    this.OTPForm = this.formBuilder.group({
      eMailForOtp: ['', Validators.required],
      otpInt: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  //Togel Login Form Ang Forget Password Form
  showLogin() {
    this.showLoginForm = !this.showLoginForm;
    this.enterNewPassword = false;
    this.getOtpButton = true;
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
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
  }
  getOtp() {
    this.loading = true;
    this.loginSubscription$ = this._loginService.generateOtp(this.OTPForm.value).subscribe(resp => {
      this.loading = false;
      if (resp.status === 200) {
        console.log(resp)
        this.getOtpButton = false;
        this.enterNewPassword = true;
        this.setMessage = { message: resp.msg, msg: true };
      }
      else {
        this.setMessage = { message: resp.msg, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
  }
  changePassword() {
    this.loginSubscription$ = this._loginService.changePassword(this.OTPForm.value).subscribe(resp => {
      if (resp.status === 200) {
        this.setMessage = { message: resp.msg, msg: true };
      }
      else {
        this.setMessage = { message: resp.msg, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
  }
}
