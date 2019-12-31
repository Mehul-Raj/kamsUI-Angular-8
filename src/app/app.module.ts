import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MyComponent} from './mycomponent/mycomponent.component';
import {Footer} from './component/component.footer';
import { HeadderComponent } from './headder/headder.component';
import { LogInBodyComponent } from './log-in-body/log-in-body.component';
@NgModule({
  declarations: [
    AppComponent,
    MyComponent,
    Footer,
    HeadderComponent,
    LogInBodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }