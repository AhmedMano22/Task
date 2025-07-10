import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ConfirmDialogModule,


  ],
  exports: [
    ButtonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ConfirmDialogModule
  ]
})
export class PrimeNgModuleModule { }
