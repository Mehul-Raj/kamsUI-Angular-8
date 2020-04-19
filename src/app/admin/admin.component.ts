import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [StorageService]
})

export class AdminComponent implements OnInit {

  private router: Router
  private loadCompanyComponent: boolean = false;
  private loadDepartmentCompnent: boolean = false;
  private loadProjectComponent: boolean = false;
  private loadTeamComponent: boolean = false;
  private loadUserComponent: boolean = false;
  private loadTagComponent: boolean = false;
  private loadgraphComponent: boolean = true;
  private viewUserdetails: boolean = false;

  constructor(private _storage: StorageService) { }
  userName: String;
  userRole: String;
  userCompany: string;
  userDepartment: string;
  userProject: string;
  userTeam: string;

  ngOnInit() {
    this.userName = this._storage.getSession("userName");
    this.userRole = this._storage.getSession("userRole");
    this.userCompany = this._storage.getSession('userCompany');
    this.userDepartment = this._storage.getSession('userDepartment');
    this.userProject = this._storage.getSession('userProject');
    this.userTeam = this._storage.getSession('userTeam');
  }

  CompanyComponent() {
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadCompanyComponent = true;
  }
  DepartmentComponent() {
    this.loadCompanyComponent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadDepartmentCompnent = true;
  }
  ProjectComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadProjectComponent = true;
  }
  TeamComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadTeamComponent = true;
  }
  UserComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadUserComponent = true;
  }
  TagComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadgraphComponent = false;
    this.loadTagComponent = true;
    this.viewUserdetails = false;

  }
  dashBoardComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = true;
    this.viewUserdetails = false;
  }
  viewUser() {
    this.viewUserdetails = true;
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;

  }

  //Log Out
  logOut() {
    sessionStorage.clear();
  }
}

