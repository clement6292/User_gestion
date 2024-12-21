import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Assurez-vous d'importer votre service d'authentification

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  isUser(): boolean {
    return this.authService.getUserRole() === 'user';
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  isSuperAdmin(): boolean {
    return this.authService.getUserRole() === 'super-admin';
  }
}