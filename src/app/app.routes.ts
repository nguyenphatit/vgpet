import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomePage)
  },
  {
    path: 'pets',
    loadComponent: () => import('./pages/pets/pets.page').then(m => m.PetsPage)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./pages/calendar/calendar.component').then(m => m.CalendarComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)
  },
  {
    path: 'new-pet',
    loadComponent: () => import('./pages/new-pet/new-pet.component').then(m => m.NewPetComponent)
  }
];
