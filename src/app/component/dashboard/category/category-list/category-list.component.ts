import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import {CategoryService} from "../../../../service/category/category.service";
import {Category} from "../../../../models/category/category.module";


@Component({
  selector: "app-category-list",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header avec actions -->
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Catégories</h2>
        <a routerLink="/dashboard/categories/new"
           class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          Nouvelle catégorie
        </a>
      </div>

      <div class="mb-6">
        <div class="relative">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (ngModelChange)="filterCategories()"
            placeholder="Rechercher..."
            class="block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div *ngIf="searchTerm" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" (click)="clearSearch()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li *ngFor="let category of filteredCategories" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="px-4 py-4 sm:px-6 flex items-center justify-between">
              <div class="flex items-center">
                <div class="ml-4">
                  <div class="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {{category.name}}
                  </div>

                </div>
              </div>
              <div class="flex space-x-2">
                <button (click)="editCategory(category)"
                        class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button (click)="deleteCategory(category)"
                        class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div *ngIf="filteredCategories.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Aucune catégorie trouvée</h3>
        <p class="mt-1 text-gray-500 dark:text-gray-400">Essayez de modifier votre recherche ou créez une nouvelle catégorie.</p>
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
export class CategoryListComponent implements OnInit {
  categories: Category[] = []
  filteredCategories: Category[] = []
  searchTerm = ""

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories
        this.filterCategories()
        console.log("Categories loaded:", categories)
      },
      error: (error) => {
        console.error("Error loading categories:", error)
      },
    })
  }

  filterCategories() {
    if (!this.searchTerm) {
      this.filteredCategories = [...this.categories]
      return
    }

    const search = this.searchTerm.toLowerCase()
    this.filteredCategories = this.categories.filter(
      (category) =>
        category.name.toLowerCase().includes(search) ||
        (category.description && category.description.toLowerCase().includes(search)),
    )
  }

  clearSearch() {
    this.searchTerm = ""
    this.filterCategories()
  }

  editCategory(category: Category) {
    if (category.id) {
      window.location.href = `/dashboard/categories/edit/${category.id}`
    }
  }

  deleteCategory(category: Category) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ?`)) {
      this.categoryService.deleteCategory(category.id!).subscribe({
        next: () => {
          this.loadCategories()
        },
        error: (error) => {
          console.error("Error deleting category:", error)
        },
      })
    }
  }
}

