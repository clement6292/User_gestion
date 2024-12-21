import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Assurez-vous d'importer votre service d'authentification

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const userRole = this.authService.getUserRole(); // Méthode pour obtenir le rôle de l'utilisateur

    // Récupérer les rôles autorisés à partir des données de la route
    const allowedRoles = route.data['roles'] || [];

    // Vérifier si l'utilisateur a un rôle autorisé
    if (allowedRoles.includes(userRole)) {
      return true; // Autoriser l'accès
    }

    // Rediriger si l'utilisateur n'a pas le rôle requis
    this.router.navigate(['/login']); // Redirection vers le tableau de bord de l'utilisateur
    return false;
  }
}