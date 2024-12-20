import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserDashboardComponent, },
  { path: 'admin', component: AdminDashboardComponent, },
  { path: 'super-admin', component: SuperAdminDashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige vers la page de login par défaut
  { path: '**', redirectTo: '/login' } // Route pour gérer les chemins non définis
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }