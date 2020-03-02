import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagNameService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //get Tag Data
  getTagData(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/tagData');
  }

  //get Tag Data
  getTypeData(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/typeData');
  }

}
