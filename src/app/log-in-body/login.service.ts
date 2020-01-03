import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class LoginService{

  baseUrl = environment.baseUrl; 
  constructor(private http: HttpClient) { }

  checkUserLogin(loginData):Observable<any>{
   var login:{'user_email':string,'user_password':string}={'user_email':loginData.email,'user_password':loginData.password};
    return this.http.post(this.baseUrl+'/api/users/checkUserLoginCredentials',login
    ,{
      headers: new HttpHeaders({
            'Content-Type':  'application/json'
         })
    }
    );
  }
}




