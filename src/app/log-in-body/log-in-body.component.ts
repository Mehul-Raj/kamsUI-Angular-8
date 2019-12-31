import { Component,OnInit} from '@angular/core';

@Component({
  selector: 'app-log-in-body',
  templateUrl: './log-in-body.component.html',
  styleUrls: ['./log-in-body.component.css']
})
export class LogInBodyComponent implements OnInit{
  disableBtn=false;
  showLoginForm:boolean=false;

constructor(){
  setTimeout(()=>{
    this.disableBtn=true;
  },3000);
}
ngOnInit(){

}
showLogin(){
this.showLoginForm=!this.showLoginForm;
}

}
