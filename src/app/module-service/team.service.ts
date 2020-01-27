import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseUrl = environment.baseUrl; 
  constructor(private http: HttpClient) { }

  createTeam(createTeamData):Observable<any>{
   var create:{'companyName':string,'departmentName':string,'projectName':string,'teamName':string}={'companyName':createTeamData.companyName,'departmentName':createTeamData.departmentName,'projectName':createTeamData.projectName,'teamName':createTeamData.teamName};
    return this.http.post(this.baseUrl+'/api/dropbox/admin/createTeam',create
    ,{
      headers: new HttpHeaders({
            'Content-Type':  'application/json'
         })
    }
    );
  }
}
