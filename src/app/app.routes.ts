import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';


export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'monitoring',
        loadComponent: () =>
          import('./pages/monitoring/monitoring.page').then((m) => m.MonitoringPage),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./pages/history/history.page').then((m) => m.HistoryPage),
      },
      {
        path: 'scan',
        loadComponent: () =>
          import('./pages/scan/scan.page').then((m) => m.ScanPage),
      },
      {
        path: 'prediction',
        loadComponent: () =>
          import('./pages/prediction/prediction.page').then((m) => m.PredictionPage),
      },
      {
        path: 'configuration',
        loadComponent: () =>
          import('./pages/configuration/configuration.page').then((m) => m.ConfigurationPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
];
