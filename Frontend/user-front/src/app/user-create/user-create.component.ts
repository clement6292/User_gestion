import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const password = control.get('password');
        const passwordConfirmation = control.get('password_confirmation');

        return password && passwordConfirmation && password.value !== passwordConfirmation.value
            ? { 'passwordMismatch': true }
            : null;
    };
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  isSuperAdmin: boolean = false; // Indique si l'utilisateur est super-admin
  errorMessage: string | null = null; // Pour afficher les messages d'erreur

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Initialisation du formulaire avec les contrôles nécessaires
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
      role: ['user'] // Définit le rôle par défaut à "user"
    }, { validators: passwordMatchValidator() });
  }

  ngOnInit() {
    this.isSuperAdmin = this.checkIfSuperAdmin();
    
    // Si l'utilisateur n'est pas super-admin, le rôle reste fixé à "user"
    if (!this.isSuperAdmin) {
      this.userForm.get('role')?.setValue('user');
    }
  }

  checkIfSuperAdmin(): boolean {
    // Remplacez ceci par la logique réelle pour vérifier le rôle de l'utilisateur connecté
    // return this.authService.currentUser.role === 'super-admin';
    return false; // Pour les tests, retournez false pour simuler un admin
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erreur lors de la création de l’utilisateur', err);
          if (err.status === 422) {
            this.errorMessage = 'Veuillez vérifier les informations saisies.';
            if (err.error.errors) {
              this.errorMessage += '\n' + Object.values(err.error.errors).flat().join('\n');
            }
          } else {
            this.errorMessage = err.error.message || 'Une erreur est survenue.';
          }
        }
      });
    } else {
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire.';
    }
  }
}