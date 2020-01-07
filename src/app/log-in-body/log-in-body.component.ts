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
  setMessage:any={};
  constructor(private formBuilder: FormBuilder,
    private router: Router, private _loginService: LoginService, private _storage: StorageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userPwd: ['', [Validators.required, Validators.minLength(1)]],
      eMail: ['', Validators.required]
    });
  }
  ngOnDestroy() {
    if (this.loginSubscription$ !== undefined) {
      this.loginSubscription$.unsubscribe();
    }
  }
  showLogin() {
    this.showLoginForm = !this.showLoginForm;
  }
  get f(): any { return this.loginForm.controls; }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }
    
    this.loginSubscription$ = this._loginService.checkUserLogin(this.loginForm.value).subscribe(resp => {
     console.log("response Object ",resp);console.log("User Name",resp.userName);

      this._storage.setSession("userName",resp.userName);
      this._storage.setSession("userProjectName",resp.userProjectName);
      this._storage.setSession("userTeamName",resp.userTeamName);
      this._storage.setSession("eMail",resp.eMail);
      this._storage.setSession("userdepartment",resp.userdepartment);
      this._storage.setSession("userRole",resp.userRole);
      this._storage.setSession("isAuthenticated",true);


      if (resp.userRole == 'Admin') {
        console.log("Admin");
        this.router.navigate(['/admin']);
      }
      if (resp.userRole == 'TL' || 'PM' || 'U') {
        this.router.navigate(['/user']);
      }else{
        this.setMessage={message:resp.errorMessage,error:true};
      }     
    },err=>{
      this.setMessage={message:'Server Error /Server Unreachable!',error:true};
    })
  }

}
