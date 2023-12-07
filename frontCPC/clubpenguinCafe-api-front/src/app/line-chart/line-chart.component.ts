import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { ShopListService } from '../services/shop-list.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit{
  constructor(
    private service: ShopListService
  ) {}
  
  public chart: any;

  public x: string[] = [];
  public y: number[] = [];

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.service.getGrafico2x().subscribe((data: any) => {
       data.forEach((element: any) => {
         this.x.push(element);
       });
   
       this.service.getGrafico2y().subscribe((data: any) => {
         data.forEach((element: any) => {
           this.y.push(element);
         });
         
         this.chart = new Chart("MyChart", {
           type: 'line', //this denotes tha type of chart
   
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
       });
    });
   }

  }