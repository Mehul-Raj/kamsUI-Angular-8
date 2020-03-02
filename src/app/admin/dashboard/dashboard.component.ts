import { Component, OnInit } from '@angular/core';
//import { ChartsModule } from 'ng2-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TagNameService } from '../../module-service/tag-name.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tagNameSubscription$: Subscription;
  setMessage: any = {};
  tagNames: string[];
  typeNames: string[];
  tagDataArray: string[] = [];
  tagNumberArray: number[] = [];

  typeDataArray: string[] = [];
  typeNumberArray: number[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _tagNameService: TagNameService,

  ) { }

  ngOnInit() {
    //get Tag Name And Tag No
    this.tagNameSubscription$ = this._tagNameService.getTagData().subscribe(resp => {
      this.tagNames = resp;
      resp.forEach(element => {
        this.tagDataArray.push(element.tagName);
        this.tagNumberArray.push(element.tagNumber);
      });
      console.log("Tag Name Array ", this.tagDataArray)
      console.log("Tag Number Array ", this.tagNumberArray)
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    });

    //get Type Name Type No
    this.tagNameSubscription$ = this._tagNameService.getTypeData().subscribe(resp => {
      this.typeNames = resp;
      resp.forEach(element => {
        this.typeDataArray.push(element.typeName);
        this.typeNumberArray.push(element.typeNumber);
      });
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })

  }

  //Document tag Chart
  public barChartOptionsType = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabelsType = this.tagDataArray;
  public barChartTypeType = 'doughnut';
  public barChartLegendType = true;
  public numArray: number[] = this.tagNumberArray;
  public barChartDataType = [
    { data: this.numArray, label: 'Total File On the Basis Of Tags' }
  ];
  pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        'rgba(43, 112, 224,0.9)',
        'rgba(24, 237, 70,0.9)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        'rgba(43, 112, 224,0.9)',
        'rgba(24, 237, 70,0.9)'
      ]
    }
  ]

  //Document Type Chart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = this.typeDataArray;
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public typenumArray: number[] = this.typeNumberArray;
  public barChartData = [
    { data: this.typeNumberArray, label: 'Total File On the Basis Of Tags' }
  ];
  public ticks: {
    beginAtZero: true
  }
}

