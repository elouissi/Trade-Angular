import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule,  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { UserService } from "../../../service/user/user.service"
import {PasswordChange} from "../../../models/user/user.module";
import {HeaderComponent} from "../../header/header.component";
import {AuthService} from "../../../service/auth/auth.service";

@Component({
  selector: "app-profile-security",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  template: `

    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Sécurité du compte</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Gérez votre mot de passe et les paramètres de sécurité
        </p>
      </div>

      <!-- Formulaire de changement de mot de passe -->
      <div class="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Changer votre mot de passe</h3>

        <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Mot de passe actuel -->
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe actuel</label>
            <input
              type="password"
              id="currentPassword"
              formControlName="currentPassword"
              class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div *ngIf="passwordForm.get('currentPassword')?.invalid && passwordForm.get('currentPassword')?.touched"
                 class="text-red-500 dark:text-red-400 text-sm mt-1">
              Le mot de passe actuel est obligatoire
            </div>
          </div>

          <!-- Nouveau mot de passe -->
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nouveau mot de passe</label>
            <input
              type="password"
              id="newPassword"
              formControlName="newPassword"
              class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div *ngIf="passwordForm.get('newPassword')?.invalid && passwordForm.get('newPassword')?.touched"
                 class="text-red-500 dark:text-red-400 text-sm mt-1">
              <span *ngIf="passwordForm.get('newPassword')?.errors?.['required']">Le nouveau mot de passe est obligatoire</span>
              <span *ngIf="passwordForm.get('newPassword')?.errors?.['minlength']">Le mot de passe doit contenir au moins 8 caractères</span>
              <span *ngIf="passwordForm.get('newPassword')?.errors?.['pattern']">Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial</span>
            </div>
          </div>

          <!-- Confirmation du nouveau mot de passe -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              formControlName="confirmPassword"
              class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div *ngIf="passwordForm.get('confirmPassword')?.invalid && passwordForm.get('confirmPassword')?.touched"
                 class="text-red-500 dark:text-red-400 text-sm mt-1">
              <span *ngIf="passwordForm.get('confirmPassword')?.errors?.['required']">La confirmation du mot de passe est obligatoire</span>
            </div>
            <div *ngIf="passwordForm.errors?.['passwordMismatch'] && passwordForm.get('confirmPassword')?.touched"
                 class="text-red-500 dark:text-red-400 text-sm mt-1">
              Les mots de passe ne correspondent pas
            </div>
          </div>

          <!-- Message de succès -->
          <div *ngIf="successMessage" class="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md">
            {{ successMessage }}
          </div>

          <!-- Message d'erreur -->
          <div *ngIf="error" class="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md">
            {{ error }}
          </div>

          <!-- Bouton de soumission -->
          <div class="flex justify-end">
            <button type="submit"
                    [disabled]="passwordForm.invalid || isSubmitting"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 dark:focus:ring-offset-gray-800">
              <span *ngIf="isSubmitting" class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Modification en cours...
              </span>
              <span *ngIf="!isSubmitting">
                Changer le mot de passe
              </span>
            </button>
          </div>
        </form>
      </div>

      <!-- Section de suppression de compte -->
      <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mt-8">
        <h3 class="text-lg font-medium text-red-800 dark:text-red-400 mb-4">Supprimer votre compte</h3>
        <p class="text-sm text-red-700 dark:text-red-300 mb-4">
          Une fois que vous supprimez votre compte, toutes vos données seront définitivement effacées. Cette action ne peut pas être annulée.
        </p>
        <button (click)="confirmDeleteAccount()"
                class="px-4 py-2 border border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 rounded-md text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Supprimer mon compte
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class ProfileSecurityComponent {
  passwordForm: FormGroup
  isSubmitting = false
  error: string | null = null
  successMessage: string | null = null

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ["", [Validators.required]],
        newPassword: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
          ],
        ],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    )
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get("newPassword")?.value
    const confirmPassword = form.get("confirmPassword")?.value

    return newPassword === confirmPassword ? null : { passwordMismatch: true }
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.isSubmitting = true
      this.error = null
      this.successMessage = null

      const passwordData: PasswordChange = {
        currentPassword: this.passwordForm.value.currentPassword,
        newPassword: this.passwordForm.value.newPassword,
        confirmPassword: this.passwordForm.value.confirmPassword,
      }

      this.userService.changePassword(passwordData).subscribe({
        next: () => {
          this.isSubmitting = false
          this.successMessage = "Votre mot de passe a été modifié avec succès."
          this.passwordForm.reset()
        },
        error: (err) => {
          this.isSubmitting = false
          this.error =
            "Une erreur s'est produite lors du changement de mot de passe. Veuillez vérifier votre mot de passe actuel et réessayer."
          console.error("Erreur lors du changement de mot de passe:", err)
        },
      })
    }
  }

  confirmDeleteAccount(): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      this.userService.deleteAccount().subscribe({
        next: () => {
          this.authService.logout()
          window.location.href = "/"
        },
        error: (err) => {
          this.error = "Une erreur s'est produite lors de la suppression du compte. Veuillez réessayer."
          console.error("Erreur lors de la suppression du compte:", err)
        },
      })
    }
  }
}

