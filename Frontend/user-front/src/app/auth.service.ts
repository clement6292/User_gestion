import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model'; // Assurez-vous que ce fichier existe

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, ) {}

  // Méthode pour se connecter
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => this.storeToken(response.token)), 
        catchError(this.handleError) 
      );
  }

  // Méthode pour s'inscrire
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password })
      .pipe(catchError(this.handleError));
  }

  // Méthode pour créer un utilisateur
  createUser(email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create_user`, { email, password, role })
      .pipe(catchError(this.handleError));
  }

  // Vérifie si l'utilisateur est authentifié
  // isAuthenticated(): boolean {
  //   const token = this.getToken();
  //   return token != null && !this.jwtHelper.isTokenExpired(token);
  // }

  // Récupère le rôle de l'utilisateur
  // getRole(): string {
  //   const token = this.getToken();
  //   if (token) {
  //     try {
  //       const decodedToken = this.jwtHelper.decodeToken(token);
  //       return decodedToken.role || '';
  //     } catch (error) {
  //       console.error('Erreur lors du décodage du token:', error);
  //       return '';
  //     }
  //   }
  //   return '';
  // }

  // Récupère les informations de l'utilisateur
  // getUser(): any {
  //   const token = this.getToken();
  //   if (token) {
  //     return this.jwtHelper.decodeToken(token);
  //   }
  //   return null;
  // }

  // Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('token');
  }

  // Récupère le token
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Stocke le token dans le localStorage
  public storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue:', error);
    return throwError(error); // Assurez-vous de renvoyer l'erreur
  }

  // Récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
      .pipe(catchError(this.handleError));
  }

  // Promouvoir un utilisateur
  promoteUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/promote_user/${userId}`, {})
      .pipe(catchError(this.handleError));
  }

  // Supprimer un utilisateur
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_user/${userId}`)
      .pipe(catchError(this.handleError));
  }
}