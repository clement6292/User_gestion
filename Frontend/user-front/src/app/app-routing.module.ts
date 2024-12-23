import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserDashboardComponent, canActivate: [AuthGuard], data: { roles: ['user', 'admin', 'super-admin'] } },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'super-admin'] } },
  { path: 'super-admin', component: SuperAdminDashboardComponent, canActivate: [AuthGuard], data: { roles: ['super-admin'] } },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-create', component: UserCreateComponent }, 
  { path: 'user-list', component: UserListComponent },
  { path: 'user-edit/:id', component: UserEditComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }