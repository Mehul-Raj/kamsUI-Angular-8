import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  private router: Router
  private loadCompanyComponent: boolean = true;
  private loadDepartmentCompnent: boolean = false;
  private loadProjectComponent: boolean = false;
  private loadTeamComponent: boolean = false;
  private loadUserComponent:boolean = false;
  private loadTagComponent:boolean = false;
  private loadgraphComponent:boolean=false;

  constructor(private _storage: StorageService) { }
  userName: String;
  userRole: String;
  ngOnInit() {
    this.userName = this._storage.getSession("userName");
    this.userRole = this._storage.getSession("userRole");
  }

  CompanyComponent() {
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent=false;
    this.loadgraphComponent=false;
    this.loadCompanyComponent = true;
  }
  DepartmentComponent() {
    this.loadCompanyComponent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent=false;
    this.loadgraphComponent=false;
    this.loadDepartmentCompnent = true;
  }
  ProjectComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent=false;
    this.loadgraphComponent=false;
    this.loadProjectComponent = true;
  }
  TeamComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent=false;
    this.loadgraphComponent=false;
    this.loadTeamComponent = true;
  }
  UserComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadTagComponent=false;
    this.loadgraphComponent=false;
    this.loadUserComponent = true;
  }
  TagComponent(){
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadgraphComponent=false;
    this.loadTagComponent=true;
    

  }
  dashBoardComponent(){
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent=false;
    this.loadgraphComponent=true;

  }

  //Log Out
  logOut(){
    sessionStorage.clear();
  }
}

