import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class LoginService {

  baseUrl = environment.baseUrl; 
  constructor(private http: HttpClient) { }

  checkUserLogin(loginData):Observable<any>{
   var login:{'eMail':string,'userPwd':string}={'eMail':loginData.eMail,'userPwd':loginData.userPwd};
    return this.http.post(this.baseUrl+'/api/dropbox/checkLogin',login
    ,{
      headers: new HttpHeaders({
            'Content-Type':  'application/json'
         })
    }
    );
  }
}
