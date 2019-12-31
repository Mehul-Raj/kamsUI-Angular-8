import {Component} from '@angular/core';

//Adding Own Component
@Component({
    selector :'app-component',
    templateUrl:'./mycomponent.component.html'
})

export class MyComponent{
    name:String='Mehul';
    age:number=26;
}