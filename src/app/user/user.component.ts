import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { ShowService } from './show.service'
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  private loadSearchComponent: boolean = false;
  private loadShowComponent: boolean = false;
  private loadUploadComponent: boolean = true;
  private showDocumant: boolean = false;

  userSubscription$: Subscription;
  eMail: string;
  FileDetails: string[];
  setMessage: any = {};
  storageCloud:boolean;
  storageLocal:boolean;


  constructor(
    private _storage: StorageService,
    private _userService: ShowService
  ) { }

  ngOnInit() {
    this.eMail = this._storage.getSession('eMail');
  }
  SearchComponent() {
    this.loadUploadComponent = false;
    this.loadShowComponent = false;
    this.showDocumant = false;
    //this.loadSearchComponent = !this.loadSearchComponent;
    this.loadSearchComponent = true;
  }
  ShowComponent() {
    this.loadUploadComponent = false;
    this.showDocumant = false;
    this.loadSearchComponent = false;
    //this.loadShowComponent = !this.loadShowComponent;
    this.loadShowComponent = true;

  }
  UploadComponent() {
    this.loadSearchComponent = false;
    this.loadShowComponent = false;
    // this.loadUploadComponent=!this.loadUploadComponent;
    this.loadUploadComponent = true;
    this.showDocumant = false;
  }
  onShow() {
    this.showDocumant = true;
    this.loadSearchComponent = false;
    this.loadShowComponent = false;
    this.loadUploadComponent = false;
    this.userSubscription$ = this._userService.getDocument().subscribe(respObj => {
      console.log(respObj)
      this.FileDetails = respObj;  
      console.log(respObj.storage)
      console.log("File Details ", respObj)
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }
  viewFile(url:string){
      window.open(url,'_blank', '', true);
    }
    
}

