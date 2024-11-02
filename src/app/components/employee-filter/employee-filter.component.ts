import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface FilterField {
  id: string;
  label: string;
}

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

  // Définissez les champs avec des labels personnalisés
  filterFields: FilterField[] = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'age', label: 'Age' },
    { id: 'dob', label: 'Date of Birth' },
    { id: 'contactNumber', label: 'Contact Number' },
    { id: 'email', label: 'Email' },
    { id: 'address', label: 'Address' },
    { id: 'salary', label: 'Salary' }
  ];

  constructor(private fb: FormBuilder) {
    // Utiliser Record<string, FormControl> pour éviter l'erreur TS7053
    const formControls: Record<string, FormControl> = this.filterFields.reduce((controls, field) => {
      controls[field.id] = new FormControl('');
      return controls;
    }, {} as Record<string, FormControl>); // Ajoutez ce type d'assertion

    this.filterForm = this.fb.group(formControls);

    // Émet les valeurs des filtres à chaque changement de valeur
    this.filterForm.valueChanges.subscribe(values => {
      this.filterChange.emit(values);
    });
  }
}
