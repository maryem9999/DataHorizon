import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeFilterComponent } from '../employee-filter/employee-filter.component';
import { EmployeeService } from '../../services/employee-service.service';
import { Employee } from '../../../Data/employees';
import { MatIconModule } from '@angular/material/icon';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: any) => string;
}

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    EmployeeFilterComponent,
    ReactiveFormsModule,
    MatIconModule,
    
  ],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  columns: Column[] = [
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    { id: 'age', label: 'Age', minWidth: 100, align: 'right' },
    { id: 'dob', label: 'Date of Birth', minWidth: 100, align: 'right' },
    { id: 'contactNumber', label: 'Contact Number', minWidth: 100, align: 'right' },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 100, align: 'right' },
    { id: 'salary', label: 'Salary', minWidth: 100, align: 'right' },
    { id: 'delete', label: '', minWidth: 100, align: 'right' },
  ];

  dataSource = new MatTableDataSource<Employee>([]);
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15, 20, 25, 100];
  columnsIds = this.columns.map(col => col.id);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees(this.pageIndex, this.pageSize);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEmployees(pageIndex: number = 0, pageSize: number = this.pageSize): void {
    this.employeeService.getEmployees(pageIndex + 1, pageSize).subscribe(data => {
      this.dataSource.data = data.map(emp => ({
        ...emp,
        address: emp.address || emp.adress // Normaliser l'adresse si nécessaire
      }));
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadEmployees(this.pageIndex, this.pageSize); // Charger les nouvelles données basées sur la pagination
  }

  onFilterChange(filterValues: any): void {
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const filters = JSON.parse(filter);
      return Object.keys(filters).every(key => {
        const filterValue = filters[key];
        if (!filterValue) return true; // Ignorer les filtres vides
        const dataValue = data[key as keyof Employee] as unknown as string;
        return dataValue && dataValue.toString().toLowerCase().includes(filterValue.toLowerCase());
      });
    };
    this.dataSource.filter = JSON.stringify(filterValues); // Déclencher le filtrage
  }

  deleteEmployee(id: number): void {
    console.log(`Delete employee with id: ${id}`);
    this.dataSource.data = this.dataSource.data.filter(emp => emp.id !== id); // Retirer de la table
  }
}
