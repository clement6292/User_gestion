import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, public authService: AuthService) {}

  // Vérifie si l'utilisateur est sur les pages de connexion ou d'inscription
  isLoginOrRegisterPage(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login' || currentRoute === '/register';
  }

  // Gère la déconnexion de l'utilisateur
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige vers la page de connexion après déconnexion
  }

  // Vérifie si l'utilisateur est authentifié
  isUserAuthenticated(): boolean {
    return this.authService.isUserAuthenticated();
  }
}