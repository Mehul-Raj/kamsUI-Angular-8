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
import { UserComponent } from './user/user.component';
import {HttpClientModule} from '@angular/common/http'
import { DepartmentComponent } from './admin/department/department.component'
import { ProjectComponent } from './admin/project/project.component'
import { TeamComponent } from './admin/team/team.component'
import { CreateUserComponent } from './admin/user/user.component'
import { SearchComponent } from './user/search/search.component';
import { ShowComponent } from './user/show/show.component';
import { UploadComponent } from './user/upload/upload.component';
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
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
