import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Footer} from './shared/footer/component.footer';
import { HeadderComponent } from './shared/headder/headder.component';
import { LogInBodyComponent } from './log-in-body/log-in-body.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './admin/company/company.component';
import { StorageService } from '../app/shared/storage.service';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from 'ngx-bootstrap';
import {ConfirmationService} from 'primeng/api';
import {HttpClientModule} from '@angular/common/http'
import { DepartmentComponent } from './admin/department/department.component'
import { ProjectComponent } from './admin/project/project.component'
import { TeamComponent } from './admin/team/team.component'
import { CreateUserComponent } from './admin/create-user/user.component'

import { UserComponent } from './user/user.component';
import { SearchComponent } from './user/search/search.component';
import { ShowComponent } from './user/show/show.component';
import { UploadComponent } from './user/upload/upload.component';
import { HeaderLogInComponent } from './shared/header-log-in/header-log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule, MatListModule } from '@angular/material';
import { ErrorAlertComponent } from '../app/shared/error-alert/error-alert.component';
import { MsgAlertComponent } from './shared/msg-alert/msg-alert.component';
import {MatTableModule} from '@angular/material/table';
import { TagComponent } from './admin/tag/tag.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ViewFileComponent } from './user/view-file/view-file.component';
import { MatPaginatorModule } from '@angular/material';
import { LoadingComponent } from './shared/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    Footer,
    HeadderComponent,
    LogInBodyComponent,
    AdminComponent,
    CompanyComponent,
    DepartmentComponent,
    ProjectComponent,
    TeamComponent,
    CreateUserComponent,
    UserComponent,
    SearchComponent,
    ShowComponent,
    UploadComponent,
    HeaderLogInComponent,
  
    ErrorAlertComponent,
  
    MsgAlertComponent,
  
    TagComponent,
  
    DashboardComponent,
  
    ViewFileComponent,
  
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    ToastrModule.forRoot(),
    AlertModule.forRoot(),
    BrowserModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule
  ],
  
  providers: [StorageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
