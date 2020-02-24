import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  uploadFile(file):Observable<any>{
    return this.http.post(this.baseUrl + '/api/dropbox/user/addFile',file,{
      reportProgress: true,
      observe: 'events',responseType: 'text'  
    });
  }
}
