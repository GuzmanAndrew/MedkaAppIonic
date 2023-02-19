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
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'mediciones',
        loadChildren: () =>
          import('./pages/mediciones/mediciones.module').then(
            (m) => m.MedicionesPageModule
          ),
      },
      {
        path: 'medicamentos',
        loadChildren: () =>
          import('./pages/medicamentos/medicamentos.module').then(
            (m) => m.MedicamentosPageModule
          ),
      },
      {
        path: 'enfermedades',
        loadChildren: () =>
          import('./pages/enfermedades/enfermedades.module').then(
            (m) => m.EnfermedadesPageModule
          ),
      },
      {
        path: 'ritmo-cardiaco',
        loadChildren: () =>
          import(
            './pages-mediciones/ritmo-cardiaco/ritmo-cardiaco.module'
          ).then((m) => m.RitmoCardiacoPageModule),
      },
      {
        path: 'presion-arterial',
        loadChildren: () =>
          import(
            './pages-mediciones/presion-arterial/presion-arterial.module'
          ).then((m) => m.PresionArterialPageModule),
      },
      {
        path: 'oxigenacion-sangre',
        loadChildren: () =>
          import(
            './pages-mediciones/oxigenacion-sangre/oxigenacion-sangre.module'
          ).then((m) => m.OxigenacionSangrePageModule),
      },
      {
        path: 'glucometria',
        loadChildren: () =>
          import('./pages-mediciones/glucometria/glucometria.module').then(
            (m) => m.GlucometriaPageModule
          ),
      },
      {
        path: 'temperature-corporal',
        loadChildren: () =>
          import(
            './pages-mediciones/temperature-corporal/temperature-corporal.module'
          ).then((m) => m.TemperatureCorporalPageModule),
      },
      {
        path: 'nuevo-medicamento',
        loadChildren: () =>
          import(
            './pages-medicamentos/nuevo-medicamento/nuevo-medicamento.module'
          ).then((m) => m.NuevoMedicamentoPageModule),
      },
      {
        path: 'formula',
        loadChildren: () =>
          import('./pages-medicamentos/formula/formula.module').then(
            (m) => m.FormulaPageModule
          ),
      },
      {
        path: 'historial',
        loadChildren: () =>
          import('./pages-medicamentos/historial/historial.module').then(
            (m) => m.HistorialPageModule
          ),
      },
      {
        path: 'registro-enfermedad',
        loadChildren: () =>
          import(
            './pages-enfermedades/registro-enfermedad/registro-enfermedad.module'
          ).then((m) => m.RegistroEnfermedadPageModule),
      },
      {
        path: 'lista-enfermedadades-cronicas',
        loadChildren: () =>
          import(
            './pages-enfermedades/lista-enfermedadades-cronicas/lista-enfermedadades-cronicas.module'
          ).then((m) => m.ListaEnfermedadadesCronicasPageModule),
      },
      {
        path: 'lista-enfermedadades-agudas',
        loadChildren: () =>
          import(
            './pages-enfermedades/lista-enfermedadades-agudas/lista-enfermedadades-agudas.module'
          ).then((m) => m.ListaEnfermedadadesAgudasPageModule),
      },
      {
        path: 'lista-alergias',
        loadChildren: () =>
          import(
            './pages-enfermedades/lista-alergias/lista-alergias.module'
          ).then((m) => m.ListaAlergiasPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
        canActivate: [LoggedUserGuard],
      },
      {
        path: 'help',
        loadChildren: () =>
          import('./pages/help/help.module').then((m) => m.HelpPageModule),
        canActivate: [LoggedUserGuard],
      },
    ],
  },
  {
    path: 'tracking',
    loadChildren: () =>
      import('./pages/tracking/tracking.module').then(
        (m) => m.TrackingPageModule
      ),
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((m) => m.LandingPageModule),
    canActivate: [OnlyVisitorGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [OnlyVisitorGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    canActivate: [OnlyVisitorGuard],
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('./pages/terms/terms.module').then((m) => m.TermsPageModule),
  },
  {
    path: 'recovery',
    loadChildren: () =>
      import('./pages/recovery/recovery.module').then(
        (m) => m.RecoveryPageModule
      ),
  },
  {
    path: 'verify',
    loadChildren: () =>
      import('./pages/verify/verify.module').then((m) => m.VerifyPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
