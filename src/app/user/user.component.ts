import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
private loadSearchComponent:boolean=false;
private loadShowComponent:boolean=false;
private loadUploadComponent:boolean=true;
  constructor() { }

  ngOnInit() {
    
  }
  SearchComponent() {
    this.loadUploadComponent = false;
    this.loadShowComponent = false;
    //this.loadSearchComponent = !this.loadSearchComponent;
    this.loadSearchComponent = true;
  }
  ShowComponent() {
    this.loadUploadComponent = false;
    this.loadSearchComponent = false;
    //this.loadShowComponent = !this.loadShowComponent;
    this.loadShowComponent = true;
  }
  UploadComponent() {
    this.loadSearchComponent = false;
    this.loadShowComponent = false;
    // this.loadUploadComponent=!this.loadUploadComponent;
    this.loadUploadComponent = true;
  }
}
