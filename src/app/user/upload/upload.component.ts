import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UploadService } from '../../module-service/upload.service';
import { StorageService } from '../../shared/storage.service';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  uploadFileData: FormGroup; uploadFileSubscription$: Subscription;
  msg: String;
  status: String;
  setMessage: any = {};
  selectedFile = null;
  fileUploadProgress: string = null;
  uploadFlag: boolean = false;
  eMail: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _storage: StorageService,
    private _uploadService: UploadService,
    private _http: HttpClient,
  ) { }
  baseUrl = environment.baseUrl;
  ngOnInit() {
    this.uploadFileData = this.formBuilder.group({
      file: [],
      uploadTo: ['', [Validators.required, Validators.minLength(1)]],
      multiTag: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.eMail = this._storage.getSession('eMail');
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    this.uploadFlag = true;
    const formData = new FormData();
    let uploadTo = this.uploadFileData.value.uploadTo;
    let multiTag = this.uploadFileData.value.multiTag;
    formData.append('uploadTo', uploadTo);
    formData.append('multiTag', multiTag)
    formData.append('file', this.selectedFile)
    formData.append('eMail', this.eMail)
    this.fileUploadProgress = '0';
    this.uploadFileSubscription$ = this._uploadService.uploadFile(formData).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        this.setMessage = { message: 'File Uploading '+this.fileUploadProgress, msg: true };
      } else if (events.type === HttpEventType.Response) {
        this.uploadFlag = false;
        if (events.body) {
          this.setMessage = { message: 'File Upload Success', msg: true };
        } else {
          this.setMessage = { message: 'Unable To Upload File', error: true };
        }
      }
    })
  }


}

