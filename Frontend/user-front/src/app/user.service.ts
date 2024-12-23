import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api'; // Base URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode pour créer un nouvel utilisateur
  createUser(userData: User): Observable<any> {
    const token = this.getToken();
    const headers = this.createHeaders(token);
    return this.http.post(`${this.apiUrl}/create_user`, userData, { headers })
      .pipe(catchError(this.handleError));
  }

  // Méthode pour obtenir la liste des utilisateurs
  getUsers(): Observable<User[]> {
    const token = this.getToken();
    const headers = this.createHeaders(token);
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Méthode pour modifier un utilisateur
  updateUser(userId: string, userData: User): Observable<any> {
    const token = this.getToken();
    const headers = this.createHeaders(token);
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData, { headers })
      .pipe(catchError(this.handleError));
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(userId: string): Observable<any> {
    const token = this.getToken();
    const headers = this.createHeaders(token);
    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Méthode pour récupérer le token
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log('Token retrieved:', token);
      return token;
    }
    return null;
  }

  // Méthode pour créer les en-têtes HTTP
  private createHeaders(token: string | null): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    } else {
      console.warn('Token is missing');
    }
    return headers;
  }

  // Méthode pour gérer les erreurs
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue:', error);
    return throwError(error);
  }
}