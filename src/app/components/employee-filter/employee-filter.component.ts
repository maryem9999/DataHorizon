import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface FilterField {
  id: string; // Identifiant du champ de filtre
  label: string; // Étiquette du champ de filtre
}

@Component({
  selector: 'app-employee-filter',
  standalone: true,
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule] // Importation des modules nécessaires
})
export class EmployeeFilterComponent {
  @Output() filterChange = new EventEmitter<any>(); // Émetteur pour envoyer les valeurs de filtre
  filterForm: FormGroup; // Formulaire réactif pour les filtres

  // Définissez les champs avec des labels personnalisés
  filterFields: FilterField[] = [
    { id: 'firstName', label: 'First Name' }, // Champ pour le prénom
    { id: 'lastName', label: 'Last Name' }, // Champ pour le nom
    { id: 'age', label: 'Age' }, // Champ pour l'âge
    { id: 'dob', label: 'Date of Birth' }, // Champ pour la date de naissance
    { id: 'contactNumber', label: 'Contact Number' }, // Champ pour le numéro de contact
    { id: 'email', label: 'Email' }, // Champ pour l'email
    { id: 'address', label: 'Address' }, // Champ pour l'adresse
    { id: 'salary', label: 'Salary' } // Champ pour le salaire
  ];

  constructor(private fb: FormBuilder) {
    // Utiliser Record<string, FormControl> pour éviter l'erreur TS7053
    const formControls: Record<string, FormControl> = this.filterFields.reduce((controls, field) => {
      controls[field.id] = new FormControl(''); // Crée un contrôle de formulaire pour chaque champ de filtre
      return controls;
    }, {} as Record<string, FormControl>); // Ajoutez ce type d'assertion

    this.filterForm = this.fb.group(formControls); // Crée le groupe de contrôle de formulaire avec les contrôles définis

    // Émet les valeurs des filtres à chaque changement de valeur
    this.filterForm.valueChanges.subscribe(values => {
      this.filterChange.emit(values); // Émet les valeurs filtrées à chaque changement
    });
  }
}
