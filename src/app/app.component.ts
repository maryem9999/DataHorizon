import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    EmployeeTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DataHorizon';
}
