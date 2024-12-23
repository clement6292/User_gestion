import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service'; // Importer le service d'alerte

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string | null = null;
  alertMessage: string = ''; // Pour stocker le message d'alerte

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService // Injection du service d'alerte
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    // S'abonner aux messages d'alerte
    this.alertService.alert$.subscribe(message => {
      this.alertMessage = message;
      // Effacer le message après quelques secondes
      setTimeout(() => {
        this.alertMessage = '';
      }, 3000);
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      error => {
        this.errorMessage = 'Erreur lors du chargement des utilisateurs : ' + error.message;
        console.error('Erreur lors du chargement des utilisateurs', error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.loadUsers(); // Recharge les utilisateurs après suppression
        },
        error => {
          this.errorMessage = 'Erreur lors de la suppression de l\'utilisateur : ' + error.message;
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
      );
    }
  }

  editUser(user: User): void {
    console.log('Modifier l utilisateur:', user);
    this.router.navigate(['/user-edit', user.id]); // Redirection vers la vue d'édition
  }
}