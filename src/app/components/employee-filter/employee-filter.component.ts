import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employee-filter',
  standalone: true,
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule]
})
export class EmployeeFilterComponent {
  @Output() filterChange = new EventEmitter<any>();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      age: [''],
      dob: [''],
      contactNumber: [''],
      email: [''],
      address: [''],
      salary: ['']
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.filterChange.emit(values);
    });
  }
}
