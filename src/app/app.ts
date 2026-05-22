import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './shared/app-header-component/app-header-component';
import { AppSidebarComponent } from './shared/app-sidebar-component/app-sidebar-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto-angular-prueba');
}
