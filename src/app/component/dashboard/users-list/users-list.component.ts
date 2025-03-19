import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { UserService } from "../../../service/user/user.service"

// Updated User interface
export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: "app-users-list",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header avec actions -->
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Utilisateurs</h2>

      </div>

      <!-- Filtres -->
      <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div class="relative">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (ngModelChange)="filterUsers()"
            placeholder="Rechercher..."
            class="block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div *ngIf="searchTerm" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" (click)="clearSearch()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <div class="relative">
          <select
            [(ngModel)]="selectedLocation"
            (ngModelChange)="filterUsers()"
            class="block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
          >
            <option value="" class="dark:bg-gray-800">Toutes les localisations</option>
            <option *ngFor="let location of locationOptions" [value]="location" class="dark:bg-gray-800">
              {{location}}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <div class="relative">
          <select
            [(ngModel)]="sortBy"
            (ngModelChange)="sortUsers()"
            class="block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
          >
            <option value="name" class="dark:bg-gray-800">Trier par nom</option>
            <option value="email" class="dark:bg-gray-800">Trier par email</option>
            <option value="location" class="dark:bg-gray-800">Trier par localisation</option>
            <option value="createdAt" class="dark:bg-gray-800">Trier par date</option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Liste des utilisateurs -->
      <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li *ngFor="let user of filteredUsers" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="px-4 py-4 sm:px-6 flex items-center justify-between">
              <div class="flex items-center">

                <div class="ml-4">
                  <div class="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {{ user.name }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ user.email }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ user.location }}
                  </div>
                </div>
              </div>
              <div class="flex items-center">
                <span class="px-2 py-1 text-xs font-semibold rounded-full mr-4 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  {{user.role}}

                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Message si aucun résultat -->
      <div *ngIf="filteredUsers.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Aucun utilisateur trouvé</h3>
        <p class="mt-1 text-gray-500 dark:text-gray-400">Essayez de modifier votre recherche ou créez un nouvel utilisateur.</p>
      </div>
    </div>
  `,
})
export class UsersListComponent implements OnInit {
  users: User[] = []
  filteredUsers: User[] = []
  searchTerm = ""
  selectedLocation = ""
  sortBy = "name"

  locationOptions: string[] = []

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users
        this.extractLocationOptions()
        this.filterUsers()
      },
      error: (error) => {
        console.error("Error loading users:", error)
        // Données de test en cas d'erreur
        this.users = [
        ]
        this.extractLocationOptions()
        this.filterUsers()
      },
    })
  }

  extractLocationOptions() {
    // Extract unique locations for the dropdown
    const locations = new Set<string>()
    this.users.forEach(user => {
      if (user.location) {
        locations.add(user.location)
      }
    })
    this.locationOptions = Array.from(locations).sort()
  }

  filterUsers() {
    if (!this.searchTerm && !this.selectedLocation) {
      this.filteredUsers = [...this.users]
      this.sortUsers()
      return
    }

    const search = this.searchTerm.toLowerCase()
    this.filteredUsers = this.users.filter((user) => {
      const matchesSearch =
        !this.searchTerm ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)

      const matchesLocation = !this.selectedLocation || user.location === this.selectedLocation

      return matchesSearch && matchesLocation
    })

    this.sortUsers()
  }

  sortUsers() {
    this.filteredUsers.sort((a, b) => {
      if (this.sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (this.sortBy === "email") {
        return a.email.localeCompare(b.email)
      } else if (this.sortBy === "location") {
        return a.location.localeCompare(b.location)
      } else if (this.sortBy === "createdAt") {
        return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
      }
      return 0
    })
  }

  clearSearch() {
    this.searchTerm = ""
    this.filterUsers()
  }

  editUser(user: User) {
    if (user.id) {
      window.location.href = `/dashboard/users/edit/${user.id}`
    }
  }

  // deleteUser(user: User) {
  //   if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.name}" ?`)) {
  //     this.userService.deleteUser(user.id!).subscribe({
  //       next: () => {
  //         this.loadUsers()
  //       },
  //       error: (error) => {
  //         console.error("Error deleting user:", error)
  //       },
  //     })
  //   }
  // }
}
