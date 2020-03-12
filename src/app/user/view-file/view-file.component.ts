import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowService } from '../show.service';
import { MatPaginator, MatTableDataSource } from '@angular/material'

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {
  responceObject: any;
  dataSource: any;
  displayedColumns: string[];
  setMessage: any = {};



  userSubscription: Subscription;

  constructor(
    private _userService: ShowService,
  ) { }

  ngOnInit() {
    this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
    this.userSubscription = this._userService.getDocument().subscribe(respObj => {
      this.responceObject = respObj;
      this.dataSource = new MatTableDataSource(this.responceObject);
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })


  }



  //view File
  viewFile(url: string) {
    window.open(url, '_blank', '', true);
  }



}
