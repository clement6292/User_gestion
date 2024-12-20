import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Assurez-vous que c'est 'styleUrls'
})
export class LoginComponent {
  loginForm: FormGroup; // Formulaire réactif
  loginError: string = '';
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialisation du formulaire avec validation
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter pour simplifier l'accès aux contrôles du formulaire
  get f() {
    return this.loginForm.controls;
  }

  // Méthode de connexion
  login() {
    this.submitted = true; // Mettez à jour 'submitted' lors de la soumission

    // Si le formulaire est invalide, on sort de la méthode
    if (this.loginForm.invalid) {
      return;
    }

    // Récupération des valeurs du formulaire
    const { email, password } = this.loginForm.value;

    // Appel au service d'authentification
    this.authService.login(email, password).subscribe({
      next: (response) => {
        // Stocker le token dans le service
        this.authService.storeToken(response.token); 
        // Rediriger vers le tableau de bord après connexion
        this.router.navigate(['/user']);
      },
      error: (err) => {
        this.loginError = 'Erreur de connexion : ' + (err.error.message || 'Erreur inconnue');
        console.error('Erreur de connexion', err);
      }
    });
  }
}