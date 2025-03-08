import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule,  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import {  Router, RouterModule } from "@angular/router"
import  { UserService } from "../../../service/user/user.service"
import {User} from "../../../models/user/user.module";
import {HeaderComponent} from "../../header/header.component";

@Component({
  selector: "app-profile-edit",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent],
  template: `

    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Modifier votre profil</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Mettez à jour vos informations personnelles
        </p>
      </div>

      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Nom -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom complet</label>
          <input
            type="text"
            id="name"
            formControlName="name"
            class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div *ngIf="profileForm.get('name')?.invalid && profileForm.get('name')?.touched"
               class="text-red-500 dark:text-red-400 text-sm mt-1">
            Le nom est obligatoire
          </div>
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Adresse email</label>
          <input
            type="email"
            id="email"
            formControlName="email"
            class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div *ngIf="profileForm.get('email')?.invalid && profileForm.get('email')?.touched"
               class="text-red-500 dark:text-red-400 text-sm mt-1">
            <span *ngIf="profileForm.get('email')?.errors?.['required']">L'adresse email est obligatoire</span>
            <span *ngIf="profileForm.get('email')?.errors?.['email']">L'adresse email n'est pas valide</span>
          </div>
        </div>

        <!-- Localisation -->
        <div>
          <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Localisation</label>
          <input
            type="text"
            id="location"
            formControlName="location"
            class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div *ngIf="profileForm.get('location')?.invalid && profileForm.get('location')?.touched"
               class="text-red-500 dark:text-red-400 text-sm mt-1">
            La localisation est obligatoire
          </div>
        </div>

        <!-- Message d'erreur -->
        <div *ngIf="error" class="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md">
          {{ error }}
        </div>

        <!-- Boutons -->
        <div class="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button type="button"
                  routerLink="/profile"
                  class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Annuler
          </button>
          <button type="submit"
                  [disabled]="profileForm.invalid || isSubmitting"
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 dark:focus:ring-offset-gray-800">
            <span *ngIf="isSubmitting" class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enregistrement...
            </span>
            <span *ngIf="!isSubmitting">
              Enregistrer les modifications
            </span>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup
  isSubmitting = false
  error: string | null = null

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.profileForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      location: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.loadUserProfile()
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          location: user.location,
        })
      },
      error: (err) => {
        this.error = "Impossible de charger les informations du profil. Veuillez réessayer plus tard."
        console.error("Erreur lors du chargement du profil:", err)
      },
    })
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isSubmitting = true
      this.error = null

      const updatedUser: User = {
        ...this.profileForm.value,
      }

      this.userService.updateUserProfile(updatedUser).subscribe({
        next: () => {
          this.isSubmitting = false
          this.router.navigate(["/profile"])
        },
        error: (err) => {
          this.isSubmitting = false
          this.error = "Une erreur s'est produite lors de la mise à jour du profil. Veuillez réessayer."
          console.error("Erreur lors de la mise à jour du profil:", err)
        },
      })
    }
  }
}

