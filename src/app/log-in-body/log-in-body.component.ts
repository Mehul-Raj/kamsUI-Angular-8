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
    sessionStorage.clear();
  }

  ngOnDestroy() {
    if (this.loginSubscription$ !== undefined) {
      this.loginSubscription$.unsubscribe();
    }
  }
  showLogin() {
    this.showLoginForm = !this.showLoginForm;
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginSubscription$ = this._loginService.checkUserLogin(this.loginForm.value).subscribe(resp => {
      console.log("response Object ", resp); 
     let userEmail=resp.eMail
      if (resp.userRole.toUpperCase() == 'ADMIN') {
        this._storage.setSession("isAuthenticated", true);
        this._storage.setSession("eMail",userEmail);
        this.router.navigate(['/admin']);
      }
      if (resp.userRole.toUpperCase() == 'ROLE_USER' || resp.userRole.toUpperCase() == 'ROLE_MANAGER' || resp.userRole == 'ROLE_TEAMLEAD') {
        this._storage.setSession("isAuthenticated", true);
        this._storage.setSession('eMail',userEmail);
        this._storage.getSession('eMail')
        this.router.navigate(['/user']);
      } else {
        this.setMessage = { message: resp.errorMessage, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }

}
