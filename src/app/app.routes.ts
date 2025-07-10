import { Routes } from '@angular/router';

export const routes: Routes = [
      {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
 
    loadComponent: () =>
      import('./view/components/employee-list/employee-list.component').then((m) => m.EmployeeListComponent),
  },
];
