import { Component, type OnInit } from "@angular/core"
import { CommonModule, NgOptimizedImage } from "@angular/common"
import { RouterModule } from "@angular/router"
import { HeaderComponent } from "../layouts/header/header.component"
import { FormsModule } from "@angular/forms"
import { trigger, transition, style, animate, query, stagger } from "@angular/animations"
import  { PostService } from "../../service/post/post.service"
import  { CategoryService } from "../../service/category/category.service"
import {  Post, PostStatus } from "../../models/post/post.module"
import  { Category } from "../../models/category/category.module"
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: "app-posts",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent,  FormsModule],
  template: `
    <app-header></app-header>
    <main>
      <!-- Hero Section -->
      <section class="relative py-24 flex items-center justify-center overflow-hidden">
        <!-- Animated background -->
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-700"></div>
          <div class="absolute inset-0 opacity-20">
            <div class="absolute inset-0 pattern-grid-lg animate-float"></div>
          </div>
          <!-- Floating objects animation -->
          <div class="floating-objects">
            <div *ngFor="let i of [1,2,3,4,5]"
                 class="floating-object"
                 [style.animation-delay]="i * 0.5 + 's'">
              <div class="w-16 h-16 bg-white/15 rounded-lg backdrop-blur-sm"></div>
            </div>
          </div>
        </div>

        <div class="container mx-auto px-4 text-center relative z-10" [@heroContent]>
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            <span>Découvrez tous les objets</span>
          </h1>
          <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Parcourez notre sélection d'objets à échanger et trouvez votre bonheur
          </p>
        </div>

        <!-- Animated wave bottom -->
        <div class="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <svg class="absolute bottom-0 w-full h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="rgba(255, 255, 255, 0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            </path>
          </svg>
        </div>
      </section>

      <!-- Filtres Section -->
      <section class="py-10 bg-white">
        <div class="container mx-auto px-4">
          <div class="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-6 shadow-md" [@fadeIn]>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Filtrer les objets</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <!-- Recherche -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  [(ngModel)]="searchTerm"
                  (ngModelChange)="filterPosts()"
                  placeholder="Rechercher..."
                  class="pl-10 block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <!-- Catégorie -->
              <div class="relative">
                <select
                  [(ngModel)]="selectedCategory"
                  (ngModelChange)="filterPosts()"
                  class="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="">Toutes les catégories</option>
                  <option *ngFor="let category of categories" [value]="category.name">
                    {{category.name}}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>

              <!-- Statut -->
              <div class="relative">
                <select
                  [(ngModel)]="selectedStatus"
                  (ngModelChange)="filterPosts()"
                  class="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="">Tous les statuts</option>
                  <option *ngFor="let status of statusOptions" [value]="status">
                    {{status}}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>

              <!-- Localisation -->
              <div class="relative">
                <select
                  [(ngModel)]="selectedLocation"
                  (ngModelChange)="filterPosts()"
                  class="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="">Toutes les localisations</option>
                  <option *ngFor="let location of locations" [value]="location">
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
          </div>
        </div>
      </section>

      <!-- Posts Grid Section -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">
            {{ filteredPosts.length }} {{ filteredPosts.length > 1 ? 'objets trouvés' : 'objet trouvé' }}
          </h2>

          <!-- Loading state -->
          <div *ngIf="isLoading" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>

          <!-- No results -->
          <div *ngIf="!isLoading && filteredPosts.length === 0" class="text-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-4 text-xl font-medium text-gray-900">Aucun objet trouvé</h3>
            <p class="mt-2 text-gray-500">Essayez de modifier vos filtres ou revenez plus tard.</p>
          </div>

          <!-- Posts grid -->
          <div *ngIf="!isLoading && filteredPosts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" [@staggerAnimation]="filteredPosts.length">
            <div *ngFor="let post of filteredPosts" class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <!-- Image principale avec galerie -->
              <div class="relative h-64">
                <img
                  [src]="getMainPhotoUrl(post)"
                  [alt]="post.title"
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />

                <!-- Badge de statut -->
                <div class="absolute top-3 right-3 z-10">
                  <span [class]="getStatusClass(post.status)"
                        class="px-3 py-1 text-xs font-semibold rounded-full">
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

                <!-- Overlay avec bouton de détail -->
                <div class="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a [routerLink]="['/details', post.id]"
                     class="px-4 py-2 bg-indigo-600 text-white rounded-md transform translate-y-4 hover:translate-y-0 transition-transform duration-300 hover:bg-indigo-700">
                    Voir détails
                  </a>
                </div>

                <!-- Indicateurs de photos -->
                <div *ngIf="post.photos && post.photos.length > 1" class="absolute bottom-3 left-0 right-0 flex justify-center space-x-1">
                  <div *ngFor="let photo of post.photos; let i = index"
                       class="w-2 h-2 rounded-full transition-all"
                       [class.bg-white]="i === getSelectedPhotoIndex(post)"
                       [class.bg-gray-400]="i !== getSelectedPhotoIndex(post)"
                       [class.w-4]="i === getSelectedPhotoIndex(post)">
                  </div>
                </div>
              </div>

              <!-- Contenu -->
              <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{post.title}}</h3>
                  <span class="text-sm text-indigo-600 font-medium">{{post.category}}</span>
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{post.description}}</p>

                <!-- Footer -->
                <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div class="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{post.location}}
                  </div>
                  <a *ngIf="this.authService.isRole('ADMIN') || post.userId == this.authService.getId() || !this.authService.isAuthenticated()"
                     [routerLink]="['/posts', post.id]"
                     class="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                    Voir détails
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </a>

                  <a *ngIf="!this.authService.isRole('ADMIN') && post.userId != this.authService.getId() && post.status == 'ACTIVE' && this.authService.isAuthenticated() "
                     [routerLink]="['/exchanges', post.id]"
                     class="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                    Échanger
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </a>
                  <a *ngIf="post.status == 'INACTIVE' && this.authService.isAuthenticated() && !this.authService.isRole('ADMIN')"
                     [routerLink]="['/posts', post.id]"
                     class="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                    post inactive
                  </a>




                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div *ngIf="!isLoading && filteredPosts.length > 0" class="mt-12 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                [disabled]="currentPage === 1"
                (click)="changePage(currentPage - 1)"
                class="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>

              <div *ngFor="let page of getPageNumbers()">
                <button
                  (click)="changePage(page)"
                  [class.bg-indigo-600]="currentPage === page"
                  [class.text-white]="currentPage === page"
                  [class.border-indigo-600]="currentPage === page"
                  [class.hover:bg-indigo-700]="currentPage === page"
                  [class.hover:bg-gray-50]="currentPage !== page"
                  class="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {{page}}
                </button>
              </div>

              <button
                [disabled]="currentPage === totalPages"
                (click)="changePage(currentPage + 1)"
                class="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <section class="py-16 bg-gradient-to-r from-indigo-600 to-violet-700">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold text-white mb-6">Vous avez des objets à échanger ?</h2>
          <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté et commencez à échanger dès aujourd'hui !
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a *ngIf="!this.authService.isAuthenticated()" routerLink="/register"
               class="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-all hover:scale-105 hover:shadow-lg">
              S'inscrire
            </a>
            <a *ngIf="this.authService.isRole('TRADER')" href="dashboard/posts"
               class="px-8 py-3 bg-indigo-600 border border-white text-white rounded-lg font-medium hover:bg-indigo-700 transition-all hover:scale-105 hover:shadow-lg">
              Consulter mes posts
            </a>
            <a *ngIf="this.authService.isRole('VISITOR')" href="dashboard/posts/new" (click)="updateToTrader()"
               class="px-8 py-3 bg-indigo-600 border border-white text-white rounded-lg font-medium hover:bg-indigo-700 transition-all hover:scale-105 hover:shadow-lg">
              Ajouter un objet
            </a>
            <a *ngIf="this.authService.isRole('ADMIN')" href="dashboard"
               class="px-8 py-3 bg-indigo-600 border border-white text-white rounded-lg font-medium hover:bg-indigo-700 transition-all hover:scale-105 hover:shadow-lg">
              Tableau de bord
            </a>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      .pattern-grid-lg {
        background: linear-gradient(135deg, #4F46E5, #8B5CF6);
        background-image: radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
        background-size: 50px 50px;
      }

      .animate-float {
        animation: float 20s linear infinite;
      }

      .floating-objects {
        position: absolute;
        inset: 0;
        overflow: hidden;
      }

      .floating-object {
        position: absolute;
        animation: floatUpward 15s ease-in-out infinite;
        opacity: 0;
      }

      .floating-object:nth-child(1) { left: 15%; animation-duration: 13s; }
      .floating-object:nth-child(2) { left: 35%; animation-duration: 15s; }
      .floating-object:nth-child(3) { left: 55%; animation-duration: 17s; }
      .floating-object:nth-child(4) { left: 75%; animation-duration: 19s; }
      .floating-object:nth-child(5) { left: 95%; animation-duration: 21s; }

      @keyframes float {
        from { transform: translateY(0) rotate(0deg); }
        to { transform: translateY(-50px) rotate(360deg); }
      }

      @keyframes floatUpward {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        15% { opacity: 0.4; }
        85% { opacity: 0.4; }
        100% {
          transform: translateY(-50px) rotate(360deg);
          opacity: 0;
        }
      }

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
    `,
  ],
  animations: [
    trigger("heroContent", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.95)" }),
        animate("1s cubic-bezier(0.4, 0, 0.2, 1)", style({ opacity: 1, transform: "scale(1)" })),
      ]),
    ]),
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("0.6s ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("staggerAnimation", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(30px)" }),
            stagger(100, [animate("0.5s ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class PostsComponent implements OnInit {
  posts: Post[] = []
  filteredPosts: Post[] = []
  categories: Category[] = []

  // Filtres
  searchTerm = ""
  selectedCategory = ""
  selectedStatus = ""
  selectedLocation = ""

  // Pagination
  currentPage = 1
  postsPerPage = 12
  totalPages = 1

  // Options
  statusOptions = Object.values(PostStatus)
  locations: string[] = ["Casablanca", "Rabat", "Marrakech", "Tanger", "Fès"]

  // État
  isLoading = true

  selectedPhotoIndices: Map<string, number> = new Map()

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    protected authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadCategories()
    this.loadPosts()
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories
      },
      error: (error) => {
        console.error("Erreur lors du chargement des catégories:", error)
      },
    })
  }
  updateToTrader(){
   const id = this.authService.getId()
  }

  loadPosts(): void {
    this.isLoading = true
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts
        this.filterPosts()

        // Initialiser les indices de photos sélectionnées
        this.posts.forEach((post) => {
          if (post.id) {
            this.selectedPhotoIndices.set(post.id, 0)
          }
        })

        this.isLoading = false
      },
      error: (error) => {
        console.error("Erreur lors du chargement des posts:", error)
        this.isLoading = false
      },
    })
  }

  filterPosts(): void {
    // Filtrer les posts selon les critères
    const filtered = this.posts.filter((post) => {
      const matchesSearch =
        !this.searchTerm ||
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(this.searchTerm.toLowerCase())

      const matchesCategory = !this.selectedCategory || post.category === this.selectedCategory

      const matchesStatus = !this.selectedStatus || post.status === this.selectedStatus

      const matchesLocation = !this.selectedLocation || post.location === this.selectedLocation

      return matchesSearch && matchesCategory && matchesStatus && matchesLocation
    })

    // Calculer le nombre total de pages
    this.totalPages = Math.ceil(filtered.length / this.postsPerPage)

    // Ajuster la page courante si nécessaire
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages)
    }

    // Paginer les résultats
    const startIndex = (this.currentPage - 1) * this.postsPerPage
    const endIndex = startIndex + this.postsPerPage

    this.filteredPosts = filtered.slice(startIndex, endIndex)
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.filterPosts()

      // Scroll to top of the posts section
      window.scrollTo({
        // top: document.querySelector(".py-16.bg-gray-50")?.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      })
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = []
    const maxPagesToShow = 5

    if (this.totalPages <= maxPagesToShow) {
      // Show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show a subset of pages
      if (this.currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
      } else if (this.currentPage >= this.totalPages - 2) {
        // Near the end
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
          pages.push(i)
        }
      } else {
        // In the middle
        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
          pages.push(i)
        }
      }
    }

    return pages
  }

  getStatusClass(status: PostStatus): string {
    switch (status) {
      case PostStatus.ACTIVE:
        return "bg-green-100 text-green-800"
      case PostStatus.INACTIVE:
        return "bg-gray-100 text-gray-800"
      case PostStatus.EXCHANGED:
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
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

