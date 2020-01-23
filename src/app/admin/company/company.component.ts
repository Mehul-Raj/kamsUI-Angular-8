import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyService } from './company.service';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService, StorageService]
})
export class CompanyComponent implements OnInit {


  createCompanyData: FormGroup;
  companySubscription$: Subscription;
  setMessage: any = {};
  CompanyName :String;
  successMsg:boolean=false;
  errorMsg:boolean=false;
  msg:String;
  status:String;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private _companyService: CompanyService, private _storage: StorageService) { }

  ngOnInit() { this.createCompanyData = this.formBuilder.group({
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
      this.status=resp.status.toUpperCase();
      if(this.status=='ERROR'){
        this.successMsg=false;
        this.errorMsg=true;
      }else if(this.status=='SUCCESS'){
        this.errorMsg=false;
        this.successMsg=true;
      }
      {
        this.setMessage = { message: resp.errorMessage, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
   // this.router.navigate(['/admin']);
  }

}
