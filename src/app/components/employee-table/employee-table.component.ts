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

// Interface définissant la structure des colonnes du tableau
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
    EmployeeFormComponent,    
    EmployeeFilterComponent    
  ]
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  // Définition des colonnes du tableau
  columns: Column[] = [
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    { id: 'age', label: 'Age', minWidth: 50, align: 'left' },
    { id: 'dob', label: 'Date of Birth', minWidth: 150, align: 'left' },
    { id: 'contactNumber', label: 'Contact Number', minWidth: 150, align: 'left' },
    { id: 'email', label: 'Email', minWidth: 200, align: 'left' },
    { id: 'address', label: 'Address', minWidth: 200, align: 'left' },
    { id: 'salary', label: 'Salary', minWidth: 100, align: 'left' },
    { id: 'delete', label: '', minWidth: 50, align: 'center' } 
  ];

  dataSource = new MatTableDataSource<Employee>([]); 
  pageSize = 10; // Taille de page par défaut
  pageIndex = 0; // Index de page par défaut
  pageSizeOptions: number[] = [10, 15, 20, 25, 100, 150]; // Options de taille de page
  columnsIds = this.columns.map(col => col.id); // IDs des colonnes à afficher
  filterForm: FormGroup; // Formulaire réactif pour le filtrage

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Référence au paginator
  @ViewChild(MatSort) sort!: MatSort; // Référence au tri

  constructor(
    private employeeService: EmployeeService, // Service pour la gestion des employés
    private dialog: MatDialog, // Service pour la gestion des dialogues
    private fb: FormBuilder // Service pour la construction de formulaires
  ) {
    // Création du formulaire de filtre
    const formControls = this.columns.reduce((controls, column) => {
      if (column.id !== 'delete') {
        controls[column.id] = new FormControl(''); // Ajoute un contrôle pour chaque colonne (sauf suppression)
      }
      return controls;
    }, {} as { [key: string]: FormControl });

    this.filterForm = this.fb.group(formControls); // Initialisation du formulaire

    // Applique le filtre à chaque changement dans le formulaire
    this.filterForm.valueChanges.subscribe(values => {
      this.onFilterChange(values);
    });
  }

  ngOnInit(): void {
    this.loadEmployees(); // Charge les employés au démarrage
  }

  ngAfterViewInit(): void {
    // Lien du paginator et du tri à la source de données
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEmployees(pageIndex: number = 0, pageSize: number = this.pageSize): void {
    // Charge les employés depuis le service
    this.employeeService.getEmployees(pageIndex + 1, pageSize).subscribe(data => {
      this.dataSource.data = data; // Met à jour la source de données avec les employés
    });
  }

  handlePageEvent(event: PageEvent): void {
    // Gère l'événement de changement de page
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadEmployees(this.pageIndex, this.pageSize); // Recharge les employés avec la nouvelle taille et index
  }

  onFilterChange(filterValues: any): void {
    // Applique le filtrage aux données de la table
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const filters = JSON.parse(filter); // Parse les valeurs de filtre
      return Object.keys(filters).every(key => {
        const filterValue = filters[key];
        if (!filterValue) return true; // Si pas de valeur, pas de filtrage
        const dataValue = data[key as keyof Employee] as unknown as string; // Récupère la valeur à filtrer
        return dataValue && dataValue.toString().toLowerCase().includes(filterValue.toLowerCase()); // Vérifie si la valeur correspond
      });
    };
    this.dataSource.filter = JSON.stringify(filterValues); // Applique le filtre en JSON
  }

  openAddEmployeeDialog(): void {
    // Ouvre le dialogue pour ajouter un nouvel employé
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '400px' // Largeur du dialogue
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEmployee(result); // Ajoute l'employé si le dialogue est fermé avec un résultat
      }
    });
  }

  addEmployee(employeeData: Employee): void {
    // Ajoute un nouvel employé à la source de données
    this.dataSource.data = [...this.dataSource.data, employeeData]; // Ajoute l'employé à la liste existante
    this.dataSource._updateChangeSubscription(); // Met à jour la table de données avec la nouvelle entrée
  }
  
  deleteEmployee(id: number): void {
    // Supprime un employé par son ID
    this.dataSource.data = this.dataSource.data.filter(emp => emp.id !== id); // Filtre les employés pour exclure celui à supprimer
  }
}
