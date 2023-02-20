import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TabsLayoutComponent } from './components/tabs-layout/tabs-layout.component';
import { LoggedUserGuard } from './guards/logged-user.guard';
import { OnlyVisitorGuard } from './guards/only-visitor.guard';


const routes: Routes = [
  {
    path: '',
    component: TabsLayoutComponent,
    canActivate: [LoggedUserGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [LoggedUserGuard],
  },
  {
    path: 'tracking',
    loadChildren: () => import('./pages/tracking/tracking.module').then(m => m.TrackingPageModule),
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then(m => m.HelpPageModule),
    canActivate: [LoggedUserGuard],
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule),
    canActivate: [OnlyVisitorGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [OnlyVisitorGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [OnlyVisitorGuard],
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsPageModule),
  },
  {
    path: 'recovery',
    loadChildren: () => import('./pages/recovery/recovery.module').then(m => m.RecoveryPageModule),
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then(m => m.VerifyPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
