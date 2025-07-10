import { CommonModule } from '@angular/common';
import { PrimeNgModuleModule } from '../../../shared/prime-ng-module.module';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../core/interfaces/EmployeeModel';

@Component({
  selector: 'app-employee-form',
  standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgModuleModule
 
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',

})
export class EmployeeFormComponent {
@Input() visible = false;
  @Input() employee: Employee | null = null;
  @Output() save = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();

  employeeForm: FormGroup;
  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Suspended', value: 'Suspended' }
  ];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.employeeForm = this.fb.group({
      id: [0],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      department: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }


ngOnChanges() {
  if (this.employee) {
    console.log('Patching employee:', this.employee);
    this.employeeForm.patchValue({
      id: this.employee.id,
      fullName: this.employee.fullName,
      department: this.employee.department,
      hireDate: new Date(this.employee.hireDate),
      status: this.employee.status
    });
    setTimeout(() => {
      this.statusOptions = [...this.statusOptions];
      this.employeeForm.controls['status'].setValue(null); 
      this.cdr.detectChanges();
      this.employeeForm.controls['status'].setValue(this.employee?.status);
      this.cdr.detectChanges();
  
    }, 100); 
  } else {
    this.employeeForm.reset({ id: 0 });
  }
}
  onSubmit() {
    if (this.employeeForm.valid) {
      this.save.emit({
        ...this.employeeForm.value,
        hireDate: this.employeeForm.value.hireDate.toISOString().split('T')[0]
      });
      this.employeeForm.reset({ id: 0 });
    }
  }

  onCancel() {
    this.cancel.emit();
    this.employeeForm.reset({ id: 0 });
  }
}