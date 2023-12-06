import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { ShopListService } from '../services/shop-list.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit {

  constructor(
    private service: ShopListService
  ) {}
  
  ngOnInit(): void {
    this.createChart();
  }

  public chart1: any;
  
  public a: any;
  public data1: any = [];
  public data2: any = [];

  public x: string[] = [];
  public y: number[] = [];


  createChart(){
  
    this.service.getGrafico1x().subscribe((data: any) => {
      data.forEach((element: any) => {
          this.x.push(element);
      });
    });

    this.service.getGrafico1y().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.y.push(element);
    });
    });

    console.log(Object.assign(this.x));
    console.log(this.y);
    
    this.chart1 = new Chart("MyChart1", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: Object.assign(this.x), 
	       datasets: [
          {
            label: "Sales",
            data: Object.assign(this.y),
            backgroundColor: 'blue'
          } 
        ]
      },
      options: {
        aspectRatio:2.5
    
      }
      
    });
  }
}
