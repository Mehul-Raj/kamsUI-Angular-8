import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { StorageService } from '../shared/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in-body',
  templateUrl: './log-in-body.component.html',
  styleUrls: ['./log-in-body.component.css'],
  providers: [LoginService,StorageService]
})
export class LogInBodyComponent implements OnInit {

  loginForm: FormGroup;
  showLoginForm: boolean = false;
  setMessage:any={};
  loginSubscription$:Subscription;
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,
    private router: Router,private _loginService:LoginService,private _storage:StorageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required]
  });
  }
  ngOnDestroy(){
    if(this.loginSubscription$!==undefined){
      this.loginSubscription$.unsubscribe();
    }
  }
  showLogin() {
    this.showLoginForm = !this.showLoginForm;
  }
  get f() :any{ return this.loginForm.controls; }

  onSubmit() {
   
    if (this.loginForm.invalid) {
      return;
  }

  this.toastr.info('Loading...', 'Please Wait', {
    timeOut: 3000,
    positionClass: 'toast-bottom-left'
  });

  this.loginSubscription$=this._loginService.checkUserLogin(this.loginForm.value).subscribe(resp=>{
    if(resp.status){
      let roleType:string='';
      let roleName:string='';
      switch(resp.userlogin.fk_role_id){
        case 1:roleType='ADMIN';roleName='Admin';break;
        case 2:roleType='CC';roleName='Content Creater';break;
        case 3:roleType='KS';roleName='User';break;
      }
      console.log(roleName,roleType);
      this._storage.setSession("userName",resp.userlogin.user_name);
      this._storage.setSession("role",resp.userlogin.fk_role_id);
      this._storage.setSession("id",resp.userlogin.user_id);
      this._storage.setSession("roleType",roleType);
      this._storage.setSession("roleName",roleName);
      this._storage.setSession("isAuthenticated",true);
    
      if(resp.userlogin.fk_role_id == 1){
        this.router.navigate(['/dashboard/admin/admin-home']);
      }
    
      if(resp.userlogin.fk_role_id == 2){
        this.router.navigate(['/dashboard/content-creater/content-home']);
      }
    
      if(resp.userlogin.fk_role_id == 3){
        this.router.navigate(['/dashboard/knowledge-seeker/learner-home']);
      }
    }else{
      this.setMessage={message:resp.errorMessage,error:true};
    }
  
   
  },err=>{
    this.setMessage={message:'Server Error /Server Unreachable!',error:true};
  })
 
  }

}
