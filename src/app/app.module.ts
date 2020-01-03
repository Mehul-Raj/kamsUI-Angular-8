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
@NgModule({
  declarations: [
    AppComponent,
  
    Footer,
    HeadderComponent,
    LogInBodyComponent,
    AdminComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
