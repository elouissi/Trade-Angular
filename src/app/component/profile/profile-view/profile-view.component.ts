import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import  { UserService } from "../../../service/user/user.service"
import {User} from "../../../models/user/user.module";

@Component({
  selector: "app-profile-view",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="user; else loading">
      <div class="space-y-6">
        <!-- En-tête avec photo de profil -->
        <div class="flex items-center space-x-5">
          <div class="flex-shrink-0">
            <div class="relative">
              <img class="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-700 object-cover"
                   src="https://ui-avatars.com/api/?name={{user.name}}&background=random"
                   alt="Photo de profil">
              <span class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></span>
            </div>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{user.name}}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Membre depuis {{user.createdAt | date:'mediumDate'}}</p>
          </div>
        </div>

        <!-- Informations du profil -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <dl class="divide-y divide-gray-200 dark:divide-gray-700">
            <div class="py-4 grid grid-cols-3 gap-4">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Nom complet</dt>
              <dd class="text-sm text-gray-900 dark:text-white col-span-2">{{user.name}}</dd>
            </div>
            <div class="py-4 grid grid-cols-3 gap-4">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Adresse email</dt>
              <dd class="text-sm text-gray-900 dark:text-white col-span-2">{{user.email}}</dd>
            </div>
            <div class="py-4 grid grid-cols-3 gap-4">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Localisation</dt>
              <dd class="text-sm text-gray-900 dark:text-white col-span-2">{{user.location}}</dd>
            </div>
          </dl>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a routerLink="/profile/edit"
             class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Modifier le profil
          </a>
        </div>
      </div>
    </div>

    <ng-template #loading>
      <div class="animate-pulse space-y-6">
        <div class="flex items-center space-x-5">
          <div class="rounded-full bg-gray-300 dark:bg-gray-700 h-16 w-16"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
            <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
          </div>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div class="space-y-6">
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class ProfileViewComponent implements OnInit {
  user: User | null = null
  error: string | null = null

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile()
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.user = user
      },
      error: (err) => {
        this.error = "Impossible de charger les informations du profil. Veuillez réessayer plus tard."
        console.error("Erreur lors du chargement du profil:", err)
      },
    })
  }
}

