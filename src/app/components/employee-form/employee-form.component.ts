import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [
    ReactiveFormsModule, // Module pour les formulaires réactifs
    MatFormFieldModule,  // Module pour les champs de formulaire Material
    MatInputModule        // Module pour les champs de saisie Material
  ]
})
export class EmployeeFormComponent {
  employeeForm: FormGroup; // Formulaire réactif pour la saisie des informations d'un employé

  constructor(
    private fb: FormBuilder, // Service pour construire le formulaire
    private dialogRef: MatDialogRef<EmployeeFormComponent> // Référence au dialogue pour fermer le formulaire
  ) {
    // Initialisation du formulaire avec des contrôles et des validateurs
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required], // Prénom (obligatoire)
      lastName: ['', Validators.required],  // Nom (obligatoire)
      age: ['', [Validators.required, Validators.min(1)]], // Âge (obligatoire et doit être supérieur à 0)
      dob: ['', Validators.required], // Date de naissance (obligatoire)
      contactNumber: ['', Validators.required], // Numéro de contact (obligatoire)
      email: ['', [Validators.required, Validators.email]], // Email (obligatoire et doit être un email valide)
      address: ['', Validators.required], // Adresse (obligatoire)
      salary: ['', [Validators.required, Validators.min(0)]] // Salaire (obligatoire et doit être supérieur ou égal à 0)
    });
    
  }

  onSave(): void {
    // Gère l'événement de sauvegarde
    if (this.employeeForm.valid) { // Vérifie si le formulaire est valide
      this.dialogRef.close(this.employeeForm.value); // Ferme le dialogue et renvoie les valeurs du formulaire
    }
  }

  onCancel(): void {
    // Gère l'annulation et ferme le dialogue sans renvoyer de valeurs
    this.dialogRef.close();
  }
}
