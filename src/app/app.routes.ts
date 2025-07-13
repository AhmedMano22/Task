import { Routes } from '@angular/router';
import { HomeComponent } from './view/components/home/home.component';
import { UserComponent } from './view/components/user/user.component';
import { LogoutComponent } from './view/auth/logout/logout.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
         loadComponent: () =>
      import('./view/components/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'user',
         loadComponent: () =>
      import('./view/components/user/user.component').then((m) => m.UserComponent),
        canActivate: [AuthGuard],
    },
    { 
        path: 'auth/callback',
        redirectTo: 'user'
    },
    {
        path: 'signedout',
         loadComponent: () =>
      import('./view/auth/logout/logout.component').then((m) => m.LogoutComponent),
    },
    { 
        path: '**',
        redirectTo: '/'
    },
];
