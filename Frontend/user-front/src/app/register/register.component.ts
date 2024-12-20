import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model'; // Assurez-vous que ce modèle est bien défini
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Importation du Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup; // Déclaration
  submitted = false;
  errorMessage: string | null = null; // Variable pour stocker le message d'erreur

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router // Injection du Router
  ) {
    // Initialisation ici
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator }); // Validation personnalisée ici
  }

  ngOnInit() {
    // Aucune action nécessaire ici pour l'instant
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null; // Réinitialiser le message d'erreur

    if (this.registerForm.invalid) {
      return;
    }

    const user: User = this.registerForm.value;

    this.authService.register(user.name, user.email, user.password).subscribe({
      next: (response) => {
        console.log('Inscription réussie !', response);
        // Redirection vers le tableau de bord après une inscription réussie
        this.router.navigate(['/user-dashboard']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription', err);
        this.errorMessage = err.error.message || 'Une erreur est survenue. Veuillez réessayer.'; // Afficher le message d'erreur
      },
    });
  }
}