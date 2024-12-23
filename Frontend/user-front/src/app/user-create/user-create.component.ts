import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Assurez-vous que ce service est importé

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
    private router: Router,
    private authService: AuthService // Injection du service d'authentification
  ) {
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
    console.log('Utilisateur est super admin:', this.isSuperAdmin);
    
    // Fixe le rôle à "user" par défaut pour les administrateurs
    if (!this.isSuperAdmin) {
      this.userForm.get('role')?.setValue('user');
    }
  }

  checkIfSuperAdmin(): boolean {
    return this.authService.currentUserValue?.role === 'super-admin'; // Utilisez le getter public
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erreur lors de la création de l’utilisateur', err);
          this.errorMessage = 'Une erreur est survenue.';
        }
      });
    } else {
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire.';
    }
  }
}