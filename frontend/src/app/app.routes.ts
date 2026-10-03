import { Route } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { Page404Component } from './pages/page404/page404.component';

export const ROUTES : Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'setting',
    loadComponent: () => import('./pages/setting/setting.component').then(m => m.SettingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./pages/confirmation/confirmation.component').then(m => m.ConfirmationComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'account-confirmed',
    loadComponent: () => import('./pages/account-confirmed/account-confirmed.component').then(m => m.AccountConfirmedComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: '404',
    component: Page404Component
  },
  {
    path: '**',
    component: Page404Component
  }
];