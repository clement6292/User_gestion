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
  private isAuthenticated = false;
  private jwtHelper = new JwtHelperService();
  private userRole: string = ''; // Initialisation par défaut
  private userName: string = ''; // Initialisation par défaut
  private userId: number | null = null; // Stockage de l'ID utilisateur

  constructor(private http: HttpClient) {}

  // Méthode pour se connecter
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, user: { id: number, name: string, email: string, role: string } }>(
      `${this.apiUrl}/login`,
      { email, password }
    ).pipe(
      tap(response => {
        this.storeToken(response.token); // Stockez le token
        this.isAuthenticated = true; // Mettez à jour l'état d'authentification
        this.setUserData(response.user); // Définir les données utilisateur à partir de l'objet user
      }),
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

  // Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  // Récupère le token
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Stocke le token dans le localStorage
  public storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Définit les données utilisateur à partir de l'objet user
  public setUserData(user: { id: number; name: string; email: string; role: string }): void {
    this.userId = user.id; // Stocke l'ID utilisateur
    this.userRole = user.role; // Récupérer le rôle
    this.userName = user.name; // Récupérer le nom
  }

  // Récupérer le rôle de l'utilisateur
  getUserRole(): string {
    return this.userRole;
  }

  // Récupérer le nom de l'utilisateur
  getUserName(): string {
    return this.userName;
  }

  // Récupérer l'ID de l'utilisateur
  getUserId(): number | null {
    return this.userId;
  }

  // Analyse le token JWT
  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(c => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    return JSON.parse(base64);
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