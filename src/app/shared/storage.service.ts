import { Injectable } from '@angular/core';

/*export interface Isession{
  private userRole:String;
  }
  
  @Injectable()
  export class StorageService {
  private auth:object<Isession>={};
    constructor() { }
  
  setSession=(key,value):void=>{
    this.auth[key]=value;
    let temp:string=JSON.parse(this.auth);
      window.sessionStorage.setItem("auth", temp);
    }*/


@Injectable()
export class StorageService {

  constructor() { }

setSession=(key,value):void=>{
    window.sessionStorage.setItem(key, value);
  }

 getSession=(key):any=>{
 let value=window.sessionStorage.getItem(key);
 return value;
}

 removeSession=(key):void=>{
  window.sessionStorage.removeItem(key);
}

}
// Save data to sessionStorage
//sessionStorage.setItem(key,value);

// Get saved data from sessionStorage
//let data = sessionStorage.getItem(key);

// Remove saved data from sessionStorage
//sessionStorage.removeItem(key);

// Remove all saved data from sessionStorage
//sessionStorage.clear();
