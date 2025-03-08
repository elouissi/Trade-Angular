import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import {HeaderComponent} from "../../header/header.component";

@Component({
  selector: "app-profile-layout",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Mon Profil</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Gérez vos informations personnelles et vos paramètres de compte
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-6">
        <!-- Sidebar de navigation -->
        <div class="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <nav class="space-y-1">
            <a
              routerLink="/profile"
              routerLinkActive="bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400"
              [routerLinkActiveOptions]="{exact: true}"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Informations personnelles
            </a>
            <a
              routerLink="/profile/security"
              routerLinkActive="bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Sécurité
            </a>
          </nav>
        </div>

        <!-- Contenu principal -->
        <div class="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Styles pour le mode sombre */
      :host-context(.dark) {
        --tw-bg-opacity: 1;
        background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
      }
    `,
  ],
})
export class ProfileLayoutComponent {}

