import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent {
  createUserForm: FormGroup; // Formulaire pour créer un utilisateur
  creationSuccess: string = '';
  creationError: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    // Initialisation du formulaire avec validation
    this.createUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]] // Rôle qui peut être 'admin' ou 'user'
    });
  }

  // Méthode pour créer un utilisateur
  createUser() {
    if (this.createUserForm.invalid) {
      return;
    }

    const { email, password, role } = this.createUserForm.value;

    this.authService.createUser(email, password, role).subscribe({
      next: () => {
        this.creationSuccess = 'Utilisateur créé avec succès !';
        this.creationError = '';
        this.createUserForm.reset(); // Réinitialiser le formulaire
      },
      error: (err) => {
        this.creationError = 'Erreur lors de la création de l\'utilisateur : ' + (err.error.message || 'Erreur inconnue');
        this.creationSuccess = '';
      }
    });
  }

  // Getter pour simplifier l'accès aux contrôles du formulaire
  get f() {
    return this.createUserForm.controls;
  }
}