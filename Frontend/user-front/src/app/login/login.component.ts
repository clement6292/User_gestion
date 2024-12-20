import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; 
  loginError: string = '';
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
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
    this.submitted = true;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Token reçu :', response.user.role);  
      const role=response.user.role       
  
        // Redirection en fonction du rôle
        if (role === 'user') {
          this.router.navigate(['/user']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/super-admin']);
        }
      },
      error: (err) => {
        this.loginError = 'Erreur de connexion : ' + (err.error.message || 'Identifiants incorrects');
        console.error('Erreur de connexion', err);
      }
    });
  }
}