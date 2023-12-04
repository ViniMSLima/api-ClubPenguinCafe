import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { LineChartComponent } from "../line-chart/line-chart.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule, MatProgressBarModule, BarChartComponent, LineChartComponent]
})
export class DashboardComponent {
  


}

