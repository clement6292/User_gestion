import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api'; // Base URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode pour créer un nouvel utilisateur
  createUser(userData: User): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérez le token depuis le stockage local
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Ajoutez le token dans les en-têtes
        'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/create_user`, userData, { headers });
}
}