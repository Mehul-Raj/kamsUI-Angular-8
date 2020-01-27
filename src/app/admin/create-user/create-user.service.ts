import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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
}
