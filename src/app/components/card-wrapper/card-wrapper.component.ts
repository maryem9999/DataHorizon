// card-wrapper.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrls: ['./card-wrapper.component.css'],
})
export class CardWrapperComponent {
  dataSource = new MatTableDataSource<any>([]);
  columns = [
    { id: 'firstName', label: 'First Name', maxWidth: 100, align: 'left' },
    { id: 'lastName', label: 'Last Name', maxWidth: 100, align: 'left' },
    { id: 'age', label: 'Age', maxWidth: 50, align: 'left' },
    { id: 'dob', label: 'Date of Birth', maxWidth: 150, align: 'left' },
    { id: 'contactNumber', label: 'Contact Number', maxWidth: 200, align: 'left' },
    { id: 'email', label: 'Email', maxWidth: 200, align: 'left' },
    { id: 'address', label: 'Address', maxWidth: 200, align: 'left' },
    { id: 'salary', label: 'Salary', maxWidth: 50, align: 'left' },
    { id: 'delete', label: 'Actions', maxWidth: 50, align: 'center' }
  ];
  columnsIds = this.columns.map(col => col.id);

  constructor(private dialog: MatDialog) {}

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

  addEmployee(employeeData: any): void {
    this.dataSource.data = [...this.dataSource.data, employeeData];
  }
}
