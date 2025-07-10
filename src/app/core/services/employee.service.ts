import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Employee } from '../interfaces/EmployeeModel';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
   private employees: Employee[] = [
  {
    "id": 1,
    "fullName": "John Doe",
    "department": "Engineering",
    "hireDate": "2023-01-15",
    "status": "Active"
  },
  {
    "id": 2,
    "fullName": "Jane Smith",
    "department": "Marketing",
    "hireDate": "2022-06-20",
    "status": "Suspended"
  },
  {
    "id": 3,
    "fullName": "Bob Johnson",
    "department": "HR",
    "hireDate": "2021-03-10",
    "status": "Active"
  }
];
  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const newEmployee = { ...employee, id: this.employees.length + 1 };
    this.employees = [...this.employees, newEmployee];
    this.employeesSubject.next(this.employees);
    return of(newEmployee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const index = this.employees.findIndex(emp => emp.id === employee.id);
    if (index !== -1) {
      this.employees = [
        ...this.employees.slice(0, index),
        employee,
        ...this.employees.slice(index + 1)
      ];
      this.employeesSubject.next(this.employees);
    }
    return of(employee);
  }

  deleteEmployee(id: number): Observable<void> {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.employeesSubject.next(this.employees);
    return of();
  }
}