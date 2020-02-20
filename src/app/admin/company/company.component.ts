import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription ,Observable} from 'rxjs';
import {map,tap} from 'rxjs/operators';
import { CompanyService } from '../../module-service/company.service';
import { StorageService } from '../../shared/storage.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService, StorageService]
})
export class CompanyComponent implements OnInit {
  createCompanyData: FormGroup;
  companySubscription$: Subscription;
  listOfCompany$:Observable<any[]>;
  setMessage: any = {};
  successMsg: boolean = false;
  errorMsg: boolean = false;
  msg: String;
  status: String;
  

  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private _companyService: CompanyService, 
    private _storage: StorageService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService) { }

  ngOnInit() {
    //this.getAllCompany();
    this.createCompanyData = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(1)]],
    });
    sessionStorage.clear(); 
  }
  onSubmit() {
    if (this.createCompanyData.invalid) {
      return;
    }
    this.companySubscription$ = this._companyService.createCompany(this.createCompanyData.value).subscribe(resp => {
      console.log("response Object ", resp);
      this.msg = resp.msg;
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
 
 /*//Get The list of company
  getAllCompany = (): void => {
  this.listOfCompany$=this._companyService.getCompany().pipe(
   map(resp=>{
    console.log("YES-2");
    console.log("response Object ", resp.companyName);
     if(resp.status){
       return resp.listOfCompany;
     }else{
      this.setMessage = { message: resp.errorMessage, error: true };
      return [];
     } 
   }),
   tap(res=>{},err=>{
    this.setMessage = { message: `Server Error Occured! ,${err.name}, ${err.statusText}`, error: true };
   })
   )
   console.log("YES-3");
  }*/
}
