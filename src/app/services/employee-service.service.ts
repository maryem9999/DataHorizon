// employee-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../../Data/employees';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://retoolapi.dev/HYd96h/data'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Update this method to accept pagination parameters
  getEmployees(pageIndex: number, pageSize: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}?page=${pageIndex}&size=${pageSize}`);
  }

  // Optionally, keep the existing method for loading all employees if needed
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
}
