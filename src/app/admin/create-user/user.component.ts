import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateUserService } from '../create-user/create-user.service';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [CreateUserService, StorageService]
})
export class CreateUserComponent implements OnInit {

  createUserData: FormGroup;
  teamSubscription$: Subscription;
  setMessage: any = {};
  successMsg: boolean = false;
  errorMsg: boolean = false;
  msg: String;
  status: String;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private _createUserService: CreateUserService, private _storage: StorageService) { }

  ngOnInit() {
    this.createUserData = this.formBuilder.group({
      userCompany: ['', [Validators.required, Validators.minLength(1)]],
      userdepartment: ['', [Validators.required, Validators.minLength(2)]],
      userProjectName: ['', [Validators.required, Validators.minLength(2)]],
      userTeamName: ['', [Validators.required, Validators.minLength(2)]],
      eMail: ['', [Validators.required, Validators.minLength(2)]],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      userRole: ['', [Validators.required, Validators.minLength(1)]]
    });
    sessionStorage.clear();
  }
  onSubmit() {
    if (this.createUserData.invalid) {
      return;
    }
    this.loading = true;

    this.teamSubscription$ = this._createUserService.createUser(this.createUserData.value).subscribe(resp => {
      console.log("response Object ", resp);
      this.msg = resp.msg;
      this.loading = false;
      this.status = resp.status.toUpperCase();
      if (this.status == 'ERROR') {
        this.successMsg = false;
        this.router.navigate(['/admin']);
        this.errorMsg = true;
      } else if (this.status == 'SUCCESS') {
        this.errorMsg = false;
        this.successMsg = true;
      }

      {
        this.setMessage = { message: resp.errorMessage, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }
}