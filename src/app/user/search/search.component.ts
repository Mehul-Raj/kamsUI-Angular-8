import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/storage.service';
import { ShowService } from '../show.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchSubscription$: Subscription;
  eMail: string;
  FileDetailsTag: string[];
  FileDetailsType:string[];
  setMessage: any = {};
  searchByTagData: FormGroup;
  searchByTypeData:FormGroup;
  x:boolean;
  y:boolean;
  z:boolean;
  constructor(
    private formBuilderTag: FormBuilder,
    private formBuilderType: FormBuilder,
    private _storage: StorageService,
    private _searchService: ShowService
  ) { }

  ngOnInit() {
    this.x=true;
    this.y=false;
    this.z=false;
    this.searchByTagData = this.formBuilderTag.group({
      searchByTagName:['',[Validators.required, Validators.minLength(2)]]
    });
    this.searchByTypeData = this.formBuilderType.group({
      searchByTypeName:['',[Validators.required, Validators.minLength(2)]]
    });
  }
//Get File Based On Tag
searchByTag(){
  if (this.searchByTagData.invalid) {
    return;
  } 
  
  this.searchSubscription$ = this._searchService.getFileTag(this.searchByTagData.value).subscribe(resp => {
    this.y=true;
    this.FileDetailsTag = resp;
    console.log(this.FileDetailsTag)
    this.x=false;
   
  }, err => {
    this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
  })
}

//Get File Based On Type
searchByType(){
  if (this.searchByTypeData.invalid) {
    return;
  } 
  this.searchSubscription$ = this._searchService.getFileType(this.searchByTypeData.value).subscribe(resp => {
    this.z=true;
    this.FileDetailsType = resp;
    console.log(this.FileDetailsType)
    this.x=false;
  }, err => {
    this.z=true;
    this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
  })
}
}
