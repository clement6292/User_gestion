import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserCreateComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    SuperAdminDashboardComponent,
    DashboardComponent,
    UserListComponent,
    UserEditComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['example.com'], // Remplacez par vos domaines
        disallowedRoutes: ['http://example.com/examplebadroute/'], // Remplacez par vos routes
      },
    }),
  ],
  providers: [
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch() // Ajoutez cette ligne pour activer les API fetch
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }