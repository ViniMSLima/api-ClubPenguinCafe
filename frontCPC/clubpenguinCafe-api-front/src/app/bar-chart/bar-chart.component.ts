import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { ShopListService } from '../services/shop-list.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements OnInit {
  constructor(private service: ShopListService) {}

  ngOnInit(): void {
    this.createChart();
  }

  public chart1: any;

  public x: string[] = [];
  public y: number[] = [];

  createChart() {
    this.service.getGrafico1().subscribe((data: any) => {
      data.data1.forEach((element: any) => {
        this.x.push(element);
      });
      data.data2.forEach((element: any) => {
        this.y.push(element);
      });

      this.chart1 = new Chart('a', {
        type: 'bar', //this denotes tha type of chart

        data: {
          // values on X-Axis
          labels: Object.assign(this.x),
          datasets: [
            {
              label: 'Vendas por produtos',
              data: Object.assign(this.y),
              backgroundColor: 'blue',
            },
          ],
        },
        options: {
          aspectRatio: 2.5,
        },
      });
    });
  }
}
