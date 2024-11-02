import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeFilterComponent } from '../employee-filter/employee-filter.component';
import { EmployeeService } from '../../services/employee-service.service';
import { Employee } from '../../../Data/employees';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right' | 'left' | 'center';
}

@Component({
  selector: 'app-employee-table',
  standalone: true,
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    EmployeeFormComponent,     // Ajouter le formulaire d'employé
    EmployeeFilterComponent    // Ajouter le composant de filtre
  ]
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  columns: Column[] = [
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    { id: 'age', label: 'Age', minWidth: 50, align: 'left' },
    { id: 'dob', label: 'Date of Birth', minWidth: 150, align: 'left' },
    { id: 'contactNumber', label: 'Contact Number', minWidth: 150, align: 'left' },
    { id: 'email', label: 'Email', minWidth: 200, align: 'left' },
    { id: 'address', label: 'Address', minWidth: 200, align: 'left' },
    { id: 'salary', label: 'Salary', minWidth: 100, align: 'left' },
    { id: 'delete', label: 'Actions', minWidth: 50, align: 'center' }
  ];

  dataSource = new MatTableDataSource<Employee>([]);
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15, 20, 25, 100];
  columnsIds = this.columns.map(col => col.id);
  filterForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    // Création du formulaire de filtre
    const formControls = this.columns.reduce((controls, column) => {
      if (column.id !== 'delete') {
        controls[column.id] = new FormControl('');
      }
      return controls;
    }, {} as { [key: string]: FormControl });

    this.filterForm = this.fb.group(formControls);

    // Applique le filtre à chaque changement dans le formulaire
    this.filterForm.valueChanges.subscribe(values => {
      this.onFilterChange(values);
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEmployees(pageIndex: number = 0, pageSize: number = this.pageSize): void {
    this.employeeService.getEmployees(pageIndex + 1, pageSize).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadEmployees(this.pageIndex, this.pageSize);
  }

  onFilterChange(filterValues: any): void {
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const filters = JSON.parse(filter);
      return Object.keys(filters).every(key => {
        const filterValue = filters[key];
        if (!filterValue) return true;
        const dataValue = data[key as keyof Employee] as unknown as string;
        return dataValue && dataValue.toString().toLowerCase().includes(filterValue.toLowerCase());
      });
    };
    this.dataSource.filter = JSON.stringify(filterValues);
  }

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEmployee(result);
      }
    });
  }

  addEmployee(employeeData: Employee): void {
    this.dataSource.data = [...this.dataSource.data, employeeData];
  }

  deleteEmployee(id: number): void {
    this.dataSource.data = this.dataSource.data.filter(emp => emp.id !== id);
  }
}
