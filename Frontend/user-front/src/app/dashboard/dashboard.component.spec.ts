import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // Récupérer le rôle de l'utilisateur

    // Redirection en fonction du rôle
    this.redirectUser();
  }

  redirectUser(): void {
    if (this.userRole === 'user') {
      this.router.navigate(['/user']); // Redirige vers le tableau de bord utilisateur
    } else if (this.userRole === 'admin') {
      this.router.navigate(['/admin']); // Redirige vers le tableau de bord administrateur
    } else if (this.userRole === 'super-admin') {
      this.router.navigate(['/super-admin']); // Redirige vers le tableau de bord super administrateur
    }
  }

  isUser(): boolean {
    return this.userRole === 'user';
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  isSuperAdmin(): boolean {
    return this.userRole === 'super-admin';
  }
}