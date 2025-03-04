import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { trigger, transition, style, animate, keyframes } from "@angular/animations";
import { HeaderComponent } from "../../component/header/header.component";
import Swal from "sweetalert2";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="min-h-screen bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center p-4">
      <div [@cardAnimation] class="bg-gray-900 rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div class="text-center mb-8">
          <img src="../../../assets/images/logo2.png" alt="coTrade Logo" class="mx-auto h-16 w-auto mb-4">
          <h2 class="text-3xl font-bold text-white">Inscription</h2>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-white mb-1">Nom</label>
            <div class="relative rounded-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                formControlName="name"
                type="text"
                id="name"
                class="bg-gray-800 text-white focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 py-2 border border-gray-700 rounded-md"
                placeholder="Votre nom"
              >
            </div>
            <div *ngIf="registerForm.get('name')?.invalid && registerForm.get('name')?.touched" class="text-red-500 text-sm mt-1">
              Nom requis (3 caractères minimum)
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-white mb-1">Email</label>
            <div class="relative rounded-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                formControlName="email"
                type="email"
                id="email"
                class="bg-gray-800 text-white focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 py-2 border border-gray-700 rounded-md"
                placeholder="vous@exemple.com"
              >
            </div>
            <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" class="text-red-500 text-sm mt-1">
              Email invalide
            </div>
          </div>

          <div>
            <label for="location" class="block text-sm font-medium text-white mb-1">Localisation</label>
            <div class="relative rounded-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                formControlName="location"
                type="text"
                id="location"
                class="bg-gray-800 text-white focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 py-2 border border-gray-700 rounded-md"
                placeholder="Ville, Pays"
              >
            </div>
            <div *ngIf="registerForm.get('location')?.invalid && registerForm.get('location')?.touched" class="text-red-500 text-sm mt-1">
              Localisation requise
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-white mb-1">Mot de passe</label>
            <div class="relative rounded-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                formControlName="password"
                type="password"
                id="password"
                class="bg-gray-800 text-white focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 py-2 border border-gray-700 rounded-md"
                placeholder="••••••••"
              >
            </div>
            <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" class="text-red-500 text-sm mt-1">
              Mot de passe requis (6 caractères minimum)
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-white mb-1">Confirmer le mot de passe</label>
            <div class="relative rounded-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                formControlName="confirmPassword"
                type="password"
                id="confirmPassword"
                class="bg-gray-800 text-white focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 py-2 border border-gray-700 rounded-md"
                placeholder="••••••••"
              >
            </div>
            <div *ngIf="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched" class="text-red-500 text-sm mt-1">
              Confirmation du mot de passe requise
            </div>
            <div *ngIf="registerForm.hasError('notSame') && registerForm.get('confirmPassword')?.touched" class="text-red-500 text-sm mt-1">
              Les mots de passe ne correspondent pas
            </div>
          </div>

          <div>
            <button
              type="submit"
              [disabled]="!registerForm.valid || isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
              [ngClass]="{'opacity-50 cursor-not-allowed': !registerForm.valid || isLoading}"
            >
              <span *ngIf="isLoading" class="inline-block animate-spin mr-2">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              S'inscrire
            </button>
          </div>
        </form>
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-300">
            Déjà un compte ?
            <a routerLink="/login" class="font-medium text-indigo-400 hover:text-indigo-300 transition duration-150 ease-in-out">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger("cardAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-50px)" }),
        animate(
          "500ms ease-out",
          keyframes([
            style({ opacity: 1, transform: "translateY(10px)", offset: 0.8 }),
            style({ opacity: 1, transform: "translateY(0)", offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ],
  styles: [
    `
      :host {
        display: block;
      }

      input.ng-invalid.ng-touched {
        border-color: rgb(239, 68, 68);
      }

      input:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5);
      }
    `,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ["", [Validators.required, Validators.minLength(3)]],
        email: ["", [Validators.required, Validators.email]],
        location: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      { validator: this.checkPasswords },
    );
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get("password")?.value;
    const confirmPass = group.get("confirmPassword")?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;

      const registrationData = {
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        location: this.registerForm.get('location')?.value
      };

      this.authService.register(registrationData).subscribe({
        next: (response) => {
          this.isLoading = false;

          Swal.fire({
            icon: 'success',
            title: 'Inscription réussie!',
            text: 'Votre compte a été créé avec succès.',
            timer: 2000,
            showConfirmButton: false
          });

          // Redirect after successful registration
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;

          Swal.fire({
            icon: 'error',
            title: 'Échec de l\'inscription',
            text: error.error?.message || 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.registerForm.controls).forEach((field) => {
        const control = this.registerForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
