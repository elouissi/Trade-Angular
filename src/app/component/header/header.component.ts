import { Component, HostListener } from "@angular/core"
import { CommonModule, NgOptimizedImage } from "@angular/common"
import {Route, Router, RouterModule} from "@angular/router"
import  { AuthService } from "../../service/auth/auth.service"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <header class="bg-gradient-to-r from-indigo-600 to-violet-700 shadow-lg">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/home" class="flex-shrink-0 flex items-center">
              <img
                alt="cotrade_logo"
                ngSrc="../../../assets/images/logo2.png"
                width="50"
                height="50"
                priority
              >
              <span class="ml-2 text-2xl font-bold text-white">coTrade</span>
            </a>
            <!-- Navigation principale -->
            <div class="hidden md:ml-8 md:flex md:space-x-4">
              <a
                routerLink="/"
                routerLinkActive="bg-indigo-700 text-white"
                [routerLinkActiveOptions]="{exact: true}"
                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-500 transition duration-150 ease-in-out"
              >
                Accueil
              </a>
              <a
                routerLink="/posts"
                routerLinkActive="bg-indigo-700 text-white"
                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-500 transition duration-150 ease-in-out"
              >
                Objets
              </a>
              <a
                *ngIf="isRole('TRADER') && isAuthenticated() "
                routerLink="/exchanges"
                routerLinkActive="bg-indigo-700 text-white"
                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-500 transition duration-150 ease-in-out"
              >
                Échanges
              </a>
            </div>
          </div>
          <div class="flex items-center">
            <a *ngIf="!isAuthenticated()" routerLink="/login" routerLinkActive="bg-indigo-700 text-white"
               class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-500 transition duration-150 ease-in-out">
              Connexion
            </a>
            <a *ngIf="!isAuthenticated()" routerLink="/register" routerLinkActive="bg-indigo-700 text-white"
               class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-500 transition duration-150 ease-in-out">
              Inscription
            </a>

            <!-- User dropdown menu -->
            <div *ngIf="isAuthenticated()" class="relative ml-4">
              <button
                (click)="toggleDropdown($event)"
                class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none transition duration-150 ease-in-out"
                [class.bg-indigo-700]="isDropdownOpen"
              >
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white mr-2">
                    {{ getInitials() }}
                  </div>
                  <span>{{ getName() }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 ml-1 transition-transform duration-200"
                    [class.rotate-180]="isDropdownOpen"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <!-- Dropdown menu -->
              <div
                *ngIf="isDropdownOpen"
                [@dropdownAnimation]
                class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
              >
                <a
                  routerLink="/dashboard"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition duration-150 ease-in-out"
                >
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </div>
                </a>
                <a
                  routerLink="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition duration-150 ease-in-out"
                >
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Mon Profil
                  </div>
                </a>
                <a
                  *ngIf="isRole('TRADER')"
                  routerLink="/exchanges"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition duration-150 ease-in-out"
                >
                  <div class="flex items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Mes Échanges
                  </div>
                </a>
                <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button
                  (click)="logout()"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition duration-150 ease-in-out"
                >
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Déconnexion
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [
    `
      /* Animation pour le hover sur les éléments du dropdown */
      .dropdown-item {
        transition: all 0.2s ease;
      }

      /* Style pour l'avatar avec initiales */
      .avatar-initials {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: linear-gradient(135deg, #4F46E5, #8B5CF6);
        color: white;
        font-weight: bold;
      }
    `,
  ],
  animations: [
    trigger("dropdownAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-10px)" }),
        animate("200ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
      transition(":leave", [animate("150ms ease-in", style({ opacity: 0, transform: "translateY(-10px)" }))]),
    ]),
  ],
})
export class HeaderComponent {
  isDropdownOpen = false

  constructor(private authService: AuthService,private router:Router) {}

  isAuthenticated() {
    return this.authService.isAuthenticated()
  }
  isRole(role:string) {
    return this.authService.isRole(role)
  }

  getName() {
    return this.authService.geName()
  }

  getInitials(): string {
    const name = this.getName() || ""
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2)
  }

  toggleDropdown(event: Event) {
    event.stopPropagation()
    this.isDropdownOpen = !this.isDropdownOpen
  }

  logout() {
    this.isDropdownOpen = false
    this.authService.logout()
    this.router.navigate(['/login']);
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    // Fermer le dropdown si on clique en dehors
    this.isDropdownOpen = false
  }
}

