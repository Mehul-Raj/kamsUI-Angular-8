import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';


@Injectable()
export class CompanyService {

  baseUrl = environment.baseUrl; 
  constructor(private http: HttpClient) { }

  createCompany(createCompanyData):Observable<any>{
   var create:{'companyName':string}={'companyName':createCompanyData.companyName};
    return this.http.post(this.baseUrl+'/api/dropbox/admin/createCompany',create
    ,{
      headers: new HttpHeaders({
            'Content-Type':  'application/json'
         })
    }
    );
  }
  public getCompany(){
    return this.http.get(this.baseUrl+'/api/dropbox/admin/getCompanyName');
  }
  /*
  getCompany():Observable<any>{
    console.log("YES-1");
    return this.http.get(`${this.baseUrl}/api/dropbox/admin/getCompanyName`);
  }
  */
}
