import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-dashboard-page',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './dashboard-page-component.html',
  styleUrl: './dashboard-page-component.css'
})
export class DashboardPageComponent {
}