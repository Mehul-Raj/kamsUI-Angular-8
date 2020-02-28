import { Component, OnInit } from '@angular/core';
//import { ChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Java', 'Sql', 'Angular', 'React', 'Python', 'Php', 'Golang'];
  public barChartType = 'polarArea';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label:  'Total File On the Basis Of Tags' }
  ];

  public barChartOptionsType = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabelsType = ['pdf', 'Text', 'Image', 'Audio', 'Video',];
  public barChartTypeType= 'doughnut';
  public barChartLegendType = true;
  public barChartDataType = [
    {data: [15, 12, 19, 7, 16], label:  'Total File On the Basis Of Tags' }
  ];
  public colors= [{
    fillColor: 'rgb(54,172,207)',
    strokeColor: 'rgb(54,172,207)',
    highlightFill: 'rgb(54,172,207)',
    highlightStroke: 'rgb(54,172,207)'
}];
}
