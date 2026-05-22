import { Component } from '@angular/core';
import { AppHeaderComponent } from '../shared/app-header-component/app-header-component';
import { AppSidebarComponent } from '../shared/app-sidebar-component/app-sidebar-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages-component',
  imports: [AppHeaderComponent, AppSidebarComponent, RouterOutlet],
  templateUrl: './pages-component.html',
  styleUrl: './pages-component.css',
})
export class PagesComponent {

}
