import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user.model'; // Assurez-vous que ce fichier existe

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  // Méthode pour se connecter
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        catchError(this.handleError),
        tap(response => this.storeToken(response.token)) // Stocke le token après connexion
      );
  }

  // Méthode pour s'inscrire
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password })
      .pipe(catchError(this.handleError));
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  // Récupérer le rôle de l'utilisateur
  getRole(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role || '';
    }
    return '';
  }

  // Récupérer les informations de l'utilisateur
  getUser(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('token');
  }

  // Récupérer le token
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Stocker le token dans le localStorage
  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue:', error);
    throw error;
  }

  // Récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Promouvoir un utilisateur
  promoteUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/promote_user/${userId}`, {});
  }

  // Supprimer un utilisateur
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_user/${userId}`);
  }
}