import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CompayName } from '../admin_shared/CompanyNames';
import { DepartmentNames } from '../admin_shared/DepartmentName';
import { ProjectNames } from '../admin_shared/ProjectName';


@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  createUser(createUserData): Observable<any> {
    var create: { 'userCompany': string, 'userdepartment': string, 'userProjectName': string, 'userTeamName': string, 'userRole': string, 'eMail': string, 'userName': string } =
    {
      'userCompany': createUserData.userCompany, 'userdepartment': createUserData.userdepartment, 'userProjectName':
        createUserData.userProjectName, 'userTeamName': createUserData.userTeamName, 'userRole': createUserData.userRole, 'eMail': createUserData.eMail, 'userName': createUserData.userName
    };

    return this.http.post(this.baseUrl + '/api/dropbox/admin/createUser', create
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

   //get Comapny Name
   getCompanyName(): Observable<any> {
    console.log("Get Company Name")
    return this.http.get<Array<CompayName>>(this.baseUrl + '/api/dropbox/admin/getCompanyName');
  }

  //get Department Name based on Comapny Name
  getDepartmentName(selectedCompany: string): Observable<any> {
    return this.http.get<Array<DepartmentNames>>(this.baseUrl + '/api/dropbox/admin/getDepartment/' + selectedCompany);
  }

  //get Project Name based on Department Name and Comapny Name
  getProjectName(selectedCompany: string, selected_Department: string): Observable<any> {
    return this.http.get<Array<ProjectNames>>(this.baseUrl + '/api/dropbox/admin/getProject/' + selectedCompany + '/' + selected_Department);
  }

  //get Project Name based on Department Name and Comapny Name
  getTeamName(selectedCompany: string, selected_Department: string,selected_Project:string): Observable<any> {
    return this.http.get<Array<ProjectNames>>(this.baseUrl + '/api/dropbox/admin/getTeam/' + selectedCompany + '/' + selected_Department+'/'+selected_Project);
  }
}
