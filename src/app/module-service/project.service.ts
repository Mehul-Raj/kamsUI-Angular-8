import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.baseUrl; 
  constructor(private http: HttpClient) { }

  createProject(createProjectData):Observable<any>{
   var create:{'companyName':string,'departmentName':string,'projectName'}={'companyName':createProjectData.companyName,'departmentName':createProjectData.departmentName,'projectName':createProjectData.projectName};
    return this.http.post(this.baseUrl+'/api/dropbox/admin/createProject',create
    ,{
      headers: new HttpHeaders({
            'Content-Type':  'application/json'
         })
    }
    );
  }
}
