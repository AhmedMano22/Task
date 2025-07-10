import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../core/interfaces/EmployeeModel';
import { CommonModule } from '@angular/common';
import { PrimeNgModuleModule } from '../../../shared/prime-ng-module.module';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule, PrimeNgModuleModule],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss'
})
export class EmployeeCardComponent {
  @Input() employee!: Employee;
  @Output() edit = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.employee);
    
  }

  onDelete() {
    this.delete.emit(this.employee.id);
  }
}
