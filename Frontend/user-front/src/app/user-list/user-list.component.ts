import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model'; // Modèle d'utilisateur
import { HttpErrorResponse } from '@angular/common/http'; // Importer l'HttpErrorResponse

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => { // Spécifiez le type ici
        this.users = data;
      },
      error: (err: HttpErrorResponse) => { // Assurez-vous que le type est spécifié
        console.error('Erreur lors du chargement des utilisateurs', err);
        this.errorMessage = 'Une erreur est survenue lors du chargement des utilisateurs.';
      }
    });
  }
}