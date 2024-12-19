import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model'; // Assurez-vous que ce modèle est bien défini
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Correction ici : 'styleUrls' au lieu de 'styleUrl'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    // Initialisation du formulaire dans le constructeur
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    // Si vous avez besoin d'effectuer des tâches d'initialisation, faites-le ici.
  }

  // Getter pour simplifier l'accès aux contrôles de formulaire
  get f() {
    return this.registerForm.controls;
  }

  // Méthode de soumission du formulaire
  onSubmit() {
    this.submitted = true;

    // Si le formulaire est invalide, on sort de la méthode
    if (this.registerForm.invalid) {
      return;
    }

    // Récupération des valeurs du formulaire
    const user: User = this.registerForm.value;

    // Appel au service d'authentification pour l'inscription de l'utilisateur
    this.authService.register(user.name, user.email, user.password).subscribe({
      next: (response) => {
        console.log('Inscription réussie !', response);
        // Vous pouvez rediriger ou afficher un message de succès ici
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription', err);
        // Vous pouvez gérer l'affichage d'une erreur ici
      },
    });
  }
}