import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  createDepartment(createDepartmentData): Observable<any> {
    var create: { 'companyName': string ,'departmentName':string} = { 'companyName': createDepartmentData.companyName ,'departmentName':createDepartmentData.departmentName};
    return this.http.post(this.baseUrl + '/api/dropbox/admin/createDepartment', create
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}
