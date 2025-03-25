import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import {  Post, PostStatus } from "../../../../models/post/post.module"
import  { PostService } from "../../../../service/post/post.service"
import  { CategoryService } from "../../../../service/category/category.service"
import  { Category } from "../../../../models/category/category.module"
import {AuthService} from "../../../../service/auth/auth.service";

@Component({
  selector: "app-post-list",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header avec actions -->
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Annonces</h2>
        <a *ngIf="this.authService.isRole('TRADER')" routerLink="/dashboard/posts/new"
           class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          Nouvelle annonce
        </a>
      </div>

      <!-- Filtres -->
      <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div class="relative">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (ngModelChange)="filterPosts()"
            placeholder="Rechercher..."
            class="block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="relative">
          <select
            [(ngModel)]="selectedCategory"
            (ngModelChange)="filterPosts()"
            class="block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
          >
            <option value="" class="dark:bg-gray-800">Toutes les catégories</option>
            <option *ngFor="let category of categories" [value]="category.name" class="dark:bg-gray-800">
              {{category.name}}
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
            [(ngModel)]="selectedStatus"
            (ngModelChange)="filterPosts()"
            class="block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
          >
            <option value="" class="dark:bg-gray-800">Tous les statuts</option>
            <option *ngFor="let status of statusOptions" [value]="status" class="dark:bg-gray-800">
              {{status}}
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
            [(ngModel)]="selectedLocation"
            (ngModelChange)="filterPosts()"
            class="block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
          >
            <option value="" class="dark:bg-gray-800">Toutes les localisations</option>
            <option *ngFor="let location of locations" [value]="location" class="dark:bg-gray-800">
              {{location}}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Liste des posts -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div *ngFor="let post of filteredPosts"
             class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <!-- Image principale avec galerie -->
          <div class="relative">
            <div class="h-64 overflow-hidden">
              <img
                [src]="getMainPhotoUrl(post)"
                [alt]="post.title"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />

              <!-- Badge de statut -->
              <div class="absolute top-2 right-2 z-10">
                <span [class]="getStatusClass(post.status)"
                      class="px-2 py-1 text-xs font-semibold rounded-full">
                  {{post.status}}
                </span>
              </div>

              <!-- Contrôles de navigation (si plusieurs photos) -->
              <div *ngIf="post.photos && post.photos.length > 1" class="absolute inset-0 flex items-center justify-between px-2">
                <button
                  (click)="prevPhoto(post); $event.stopPropagation()"
                  class="w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  (click)="nextPhoto(post); $event.stopPropagation()"
                  class="w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div class="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <a [routerLink]="['/dashboard/posts', post.id]"
                   class="px-4 py-2 bg-indigo-600 text-white rounded-md transform translate-y-4 hover:translate-y-0 transition-transform duration-300 hover:bg-indigo-700">
                  Voir détails
                </a>
              </div>
            </div>

            <div *ngIf="post.photos && post.photos.length > 1" class="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
              <div *ngFor="let photo of post.photos; let i = index"
                   class="w-2 h-2 rounded-full transition-all"
                   [class.bg-white]="i === getSelectedPhotoIndex(post)"
                   [class.bg-gray-400]="i !== getSelectedPhotoIndex(post)"
                   [class.w-4]="i === getSelectedPhotoIndex(post)">
              </div>
            </div>
          </div>

          <!-- Miniatures des photos -->
          <div *ngIf="post.photos && post.photos.length > 1" class="flex overflow-x-auto p-2 space-x-2 bg-gray-100 dark:bg-gray-900">
            <div *ngFor="let photo of post.photos; let i = index"
                 class="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden cursor-pointer transition-all"
                 [class.ring-2]="i === getSelectedPhotoIndex(post)"
                 [class.ring-indigo-500]="i === getSelectedPhotoIndex(post)"
                 [class.opacity-100]="i === getSelectedPhotoIndex(post)"
                 [class.opacity-60]="i !== getSelectedPhotoIndex(post)"
                 (click)="selectPhoto(post, i)">
              <img [src]="getPhotoUrl(photo)" [alt]="photo.title || 'Photo ' + (i+1)" class="w-full h-full object-cover" />
            </div>
          </div>

          <div class="p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{{post.title}}</h3>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{post.category}}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{{post.description}}</p>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{post.location}}
              </div>

              <div class="flex space-x-2">
                <button (click)="editPost(post)"
                        class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button (click)="deletePost(post)"
                        class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="filteredPosts.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Aucune annonce trouvée</h3>
        <p class="mt-1 text-gray-500 dark:text-gray-400">Essayez de modifier vos filtres ou créez une nouvelle annonce.</p>
      </div>
    </div>
  `,
  styles: [
    `
      .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      /* Styles pour les selects personnalisés */
      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: none;
      }

      /* Styles pour le mode sombre */
      :host-context(.dark) {
        --tw-bg-opacity: 1;
        background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
      }

      /* Scrollbar personnalisée pour les miniatures */
      .overflow-x-auto {
        scrollbar-width: thin;
        scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
      }

      .overflow-x-auto::-webkit-scrollbar {
        height: 4px;
      }

      .overflow-x-auto::-webkit-scrollbar-track {
        background: transparent;
      }

      .overflow-x-auto::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.5);
        border-radius: 2px;
      }
    `,
  ],
})
export class PostListComponent implements OnInit {
  posts: Post[] = []
  filteredPosts: Post[] = []
  searchTerm = ""
  selectedCategory = ""
  selectedStatus = ""
  selectedLocation = ""

  // Stocke l'index de la photo sélectionnée pour chaque post
  selectedPhotoIndices: Map<string, number> = new Map()

  categories: Category[] = []
  statusOptions = Object.values(PostStatus)
  locations: string[] = ["Casablanca", "Rabat", "Marrakech", "Tanger", "Fès"]

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    protected authService: AuthService,
  ) {}

  ngOnInit() {
    this.loadCategories()
    if (this.authService.isRole("ADMIN")){
      this.loadPosts()
    }else {
      this.loadPostsByCreated()
    }
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories
        console.log("Categories loaded:", categories)
      },
      error: (error) => {
        console.error("Error loading categories:", error)
      },
    })
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts
      this.filterPosts()

      // Initialiser les indices de photos sélectionnées
      this.posts.forEach((post) => {
        if (post.id) {
          this.selectedPhotoIndices.set(post.id, 0)
        }
      })
    })
  }

  loadPostsByCreated() {
    this.postService.getAllPostsByCreated(this.authService.getId()).subscribe((posts) => {
      this.posts = posts
      this.filterPosts()

      // Initialiser les indices de photos sélectionnées
      this.posts.forEach((post) => {
        if (post.id) {
          this.selectedPhotoIndices.set(post.id, 0)
        }
      })
    })
  }



  filterPosts() {
    this.filteredPosts = this.posts.filter((post) => {
      const matchesSearch =
        !this.searchTerm ||
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(this.searchTerm.toLowerCase())

      const matchesCategory = !this.selectedCategory || post.category === this.selectedCategory

      const matchesStatus = !this.selectedStatus || post.status === this.selectedStatus

      const matchesLocation = !this.selectedLocation || post.location === this.selectedLocation

      return matchesSearch && matchesCategory && matchesStatus && matchesLocation
    })
  }

  getStatusClass(status: PostStatus): string {
    switch (status) {
      case PostStatus.ACTIVE:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case PostStatus.INACTIVE:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      case PostStatus.EXCHANGED:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  editPost(post: Post) {
    // Naviguer vers le formulaire d'édition
    if (post.id) {
      window.location.href = `/dashboard/posts/edit/${post.id}`
    }
  }

  deletePost(post: Post) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      this.postService.deletePost(post.id!).subscribe(() => {
        this.loadPosts()
      })
    }
  }

  getPhotoUrl(photo: any): string {
    if (!photo || !photo.filePath) {
      return "/assets/placeholder.jpg"
    }
    return "http://localhost:8445/" + photo.filePath
  }

  getMainPhotoUrl(post: Post): string {
    if (!post.photos || post.photos.length === 0) {
      return "/assets/placeholder.jpg"
    }

    const selectedIndex = this.getSelectedPhotoIndex(post)
    return "http://localhost:8445/" + post.photos[selectedIndex].filePath
  }

  selectPhoto(post: Post, index: number) {
    if (post.id) {
      this.selectedPhotoIndices.set(post.id, index)
    }
  }

  getSelectedPhotoIndex(post: Post): number {
    return post.id ? this.selectedPhotoIndices.get(post.id) || 0 : 0
  }

  nextPhoto(post: Post) {
    if (!post.id || !post.photos || post.photos.length <= 1) return

    const currentIndex = this.getSelectedPhotoIndex(post)
    const nextIndex = (currentIndex + 1) % post.photos.length
    this.selectPhoto(post, nextIndex)
  }

  prevPhoto(post: Post) {
    if (!post.id || !post.photos || post.photos.length <= 1) return

    const currentIndex = this.getSelectedPhotoIndex(post)
    const prevIndex = (currentIndex - 1 + post.photos.length) % post.photos.length
    this.selectPhoto(post, prevIndex)
  }
}

