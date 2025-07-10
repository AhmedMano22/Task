import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PrimeNgModuleModule } from '../../../shared/prime-ng-module.module';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable } from 'rxjs';
import { Employee } from '../../../core/interfaces/EmployeeModel';
import { EmployeeService } from '../../../core/services/employee.service';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-employee-list',
  standalone: true,
   imports: [
    CommonModule,
    FormsModule,
    EmployeeCardComponent,
    EmployeeFormComponent,
    InputTextModule,
    PrimeNgModuleModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
 employees$!: Observable<Employee[]>;
  searchTerm$ = new BehaviorSubject<string>('');
  statusFilter$ = new BehaviorSubject<string>('All');
  selectedStatus: string = 'All';
  showForm = false;
  selectedEmployee: Employee | null = null;

  statusOptions = [
    { label: 'All', value: 'All' },
    { label: 'Active', value: 'Active' },
    { label: 'Suspended', value: 'Suspended' }
  ];

  constructor(
    private employeeService: EmployeeService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.employees$ = combineLatest([
      this.employeeService.getEmployees(),
      this.searchTerm$.pipe(debounceTime(300)),
      this.statusFilter$
    ]).pipe(
      map(([employees, searchTerm, status]) => {
        let filtered = employees;
        if (searchTerm) {
          searchTerm = searchTerm.toLowerCase();
          filtered = filtered.filter(emp =>
            emp.fullName.toLowerCase().includes(searchTerm) ||
            emp.department.toLowerCase().includes(searchTerm) ||
            emp.hireDate.toLowerCase().includes(searchTerm) ||
            emp.status.toLowerCase().includes(searchTerm)
          );
        }
        if (status !== 'All') {
          filtered = filtered.filter(emp => emp.status === status);
        }
        console.log('Filtered employees:', filtered);
        return filtered;
      })
    );
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(value);
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.value;
    this.statusFilter$.next(event.value);
  }

  onAddEmployee() {
    this.selectedEmployee = null;
    this.showForm = true;
  }

  onEditEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.showForm = true;
  }

  onSaveEmployee(employee: Employee) {
    console.log('Saving employee:', employee);
    if (employee.id) {
      this.employeeService.updateEmployee(employee).subscribe({
        next: () => {
          this.showForm = false;
          this.selectedEmployee = null;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      this.employeeService.addEmployee(employee).subscribe({
        next: () => {
          this.showForm = false;
          this.selectedEmployee = null;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Add failed:', err)
      });
    }
  }

  onDeleteEmployee(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this employee?',
      accept: () => {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            console.log('Employee deleted:', id);
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Delete failed:', err)
        });
      }
    });
  }

  onCancelForm() {
    this.showForm = false;
    this.selectedEmployee = null;
    this.cdr.detectChanges();
  }
}