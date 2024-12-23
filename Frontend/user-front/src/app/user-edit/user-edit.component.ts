import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id!: string ; // Initialisation
  user: User | null = null;
  errorMessage: string | null = null;

  constructor(
   public userService: UserService,
   public route: ActivatedRoute,
   public router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!; // Utilisation de l'opérateur non null
    console.log(this.id );
    
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUsers().subscribe(
      
      users => {
       this.user = users.find(u => String(u.id) === this.id) || null;
      },
      error => {
        this.errorMessage = 'Erreur lors du chargement de l\'utilisateur : ' + error.message;
        console.error('Erreur lors du chargement de l\'utilisateur', error);
      }
    );
  }

  updateUser(): void {
    if (this.user) {
      this.userService.updateUser(this.id, this.user).subscribe(
        () => {
          this.router.navigate(['/user-list']); // Redirige vers la liste des utilisateurs
        },
        error => {
          this.errorMessage = 'Erreur lors de la mise à jour de l\'utilisateur : ' + error.message;
          console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        }
      );
    }
  }
}