import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  ActivatedRoute, RouterModule } from "@angular/router"
import { trigger, transition, style, animate } from "@angular/animations"
import { FormsModule } from "@angular/forms"
import {HeaderComponent} from "../header/header.component";
import {Post, PostStatus} from "../../models/post/post.module";
import {PostService} from "../../service/post/post.service";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: "app-post-detail",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule],
  template: `
    <app-header></app-header>
    <main>
      <!-- Loading state -->
      <div *ngIf="isLoading" class="flex justify-center items-center py-32">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>

      <div *ngIf="!isLoading && post">
        <!-- Hero Section with Post Title -->
        <section class="relative py-20 flex items-center justify-center overflow-hidden">
          <!-- Animated background -->
          <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-700"></div>
            <div class="absolute inset-0 opacity-20">
              <div class="absolute inset-0 pattern-grid-lg animate-float"></div>
            </div>
          </div>

          <div class="container mx-auto px-4 text-center relative z-10" [@fadeIn]>
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              {{ post.title }}
            </h1>
            <div class="flex flex-wrap justify-center items-center gap-4 mb-6">
              <span [class]="getStatusClass(post.status)"
                    class="px-3 py-1 text-sm font-semibold rounded-full">
                {{ post.status }}
              </span>
              <span class="text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ post.location }}
              </span>
              <span class="text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {{ post.category }}
              </span>
            </div>
          </div>
        </section>

        <!-- Post Content Section -->
        <section class="py-12 bg-white">
          <div class="container mx-auto px-4">
            <div class="max-w-5xl mx-auto">
              <div class="bg-white rounded-xl shadow-lg overflow-hidden" [@fadeIn]>
                <!-- Image Gallery -->
                <div class="relative">
                  <div class="aspect-w-16 aspect-h-9 bg-gray-100">
                    <img
                      *ngIf="post.photos && post.photos.length > 0"
                      [src]="getMainPhotoUrl()"
                      [alt]="post.title"
                      class="w-full h-full object-contain"
                    />
                    <img
                      *ngIf="!post.photos || post.photos.length === 0"
                      src="/assets/placeholder.jpg"
                      [alt]="post.title"
                      class="w-full h-full object-contain"
                    />
                  </div>

                  <!-- Navigation controls -->
                  <div *ngIf="post.photos && post.photos.length > 1" class="absolute inset-0 flex items-center justify-between px-4">
                    <button
                      (click)="prevPhoto()"
                      class="w-10 h-10 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      (click)="nextPhoto()"
                      class="w-10 h-10 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <!-- Thumbnails -->
                  <div *ngIf="post.photos && post.photos.length > 1" class="flex overflow-x-auto p-2 space-x-2 bg-gray-100">
                    <div *ngFor="let photo of post.photos; let i = index"
                         class="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden cursor-pointer transition-all"
                         [class.ring-2]="i === currentImageIndex"
                         [class.ring-indigo-500]="i === currentImageIndex"
                         [class.opacity-100]="i === currentImageIndex"
                         [class.opacity-60]="i !== currentImageIndex"
                         (click)="setCurrentImage(i)">
                      <img [src]="getPhotoUrl(photo)" [alt]="photo.title || 'Photo ' + (i+1)" class="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <!-- Post Details -->
                <div class="p-6">
                  <h2 class="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                  <p class="text-gray-700 mb-6 whitespace-pre-line">{{ post.description }}</p>

                  <!-- Owner Info -->
                  <div class="flex items-center mb-6">
                    <div class="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white mr-3">
                      {{ getOwnerInitials() }}
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">{{ ownerName }}</h3>
                      <p class="text-sm text-gray-500">Propriétaire</p>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex flex-wrap gap-4 mt-6">
                    <a
                      *ngIf="isAuthenticated() && !isOwner()"
                      [routerLink]="['/exchanges', post.id]"
                      class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-700 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-violet-800 transition-all hover:shadow-lg flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Proposer un échange
                    </a>
                    <a
                      *ngIf="isOwner()"
                      [routerLink]="['/dashboard/posts/edit', post.id]"
                      class="px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition-all flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Modifier l'annonce
                    </a>
                    <a
                      routerLink="/posts"
                      class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Retour aux annonces
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Similar Posts Section -->
        <section class="py-12 bg-gray-50">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 text-center mb-10">Objets similaires</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" [@fadeIn]>
              <div *ngFor="let similarPost of similarPosts" class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <a [routerLink]="['/posts', similarPost.id]" class="block">
                  <div class="relative h-48">
                    <img
                      [src]="getSimilarPostImage(similarPost)"
                      [alt]="similarPost.title"
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute top-2 right-2">
                      <span [class]="getStatusClass(similarPost.status)"
                            class="px-2 py-1 text-xs font-semibold rounded-full">
                        {{similarPost.status}}
                      </span>
                    </div>
                  </div>
                  <div class="p-4">
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{similarPost.title}}</h3>
                      <span class="text-xs text-indigo-600 font-medium">{{similarPost.category}}</span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{similarPost.description}}</p>
                    <div class="flex items-center text-xs text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{similarPost.location}}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Error state -->
      <div *ngIf="!isLoading && !post" class="container mx-auto px-4 py-32 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 class="mt-4 text-2xl font-bold text-gray-900">Annonce introuvable</h2>
        <p class="mt-2 text-gray-500 mb-8">L'annonce que vous recherchez n'existe pas ou a été supprimée.</p>
        <a routerLink="/posts" class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux annonces
        </a>
      </div>
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

      @keyframes float {
        from { transform: translateY(0) rotate(0deg); }
        to { transform: translateY(-50px) rotate(360deg); }
      }

      .aspect-w-16 {
        position: relative;
        padding-bottom: 56.25%;
      }

      .aspect-w-16 > img {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        object-fit: contain;
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
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("0.6s ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null
  similarPosts: Post[] = []
  isLoading = true
  currentImageIndex = 0
  ownerName = "Utilisateur"

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.loadPost(id)
    } else {
      this.isLoading = false
    }
  }

  loadPost(id: string): void {
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post
        this.ownerName = "Utilisateur " + post.userId.substring(0, 5) // Simuler un nom d'utilisateur
        this.loadSimilarPosts(post.category)
        this.isLoading = false
      },
      error: (error) => {
        console.error("Erreur lors du chargement du post:", error)
        this.isLoading = false
      },
    })
  }

  loadSimilarPosts(category: string): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        // Filtrer les posts de la même catégorie, mais pas le post actuel
        this.similarPosts = posts.filter((p) => p.category === category && p.id !== this.post?.id).slice(0, 4) // Limiter à 4 posts similaires
      },
      error: (error) => {
        console.error("Erreur lors du chargement des posts similaires:", error)
      },
    })
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

  getMainPhotoUrl(): string {
    if (!this.post || !this.post.photos || this.post.photos.length === 0) {
      return "/assets/placeholder.jpg"
    }
    return this.getPhotoUrl(this.post.photos[this.currentImageIndex])
  }

  getSimilarPostImage(post: Post): string {
    if (!post.photos || post.photos.length === 0) {
      return "/assets/placeholder.jpg"
    }
    return this.getPhotoUrl(post.photos[0])
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index
  }

  nextPhoto(): void {
    if (!this.post || !this.post.photos || this.post.photos.length <= 1) return
    this.currentImageIndex = (this.currentImageIndex + 1) % this.post.photos.length
  }

  prevPhoto(): void {
    if (!this.post || !this.post.photos || this.post.photos.length <= 1) return
    this.currentImageIndex = (this.currentImageIndex - 1 + this.post.photos.length) % this.post.photos.length
  }

  getOwnerInitials(): string {
    return this.ownerName
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2)
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated()
  }

  isOwner(): boolean {
    if (!this.post || !this.isAuthenticated()) return false
    return this.post.userId === this.authService.getId()
  }
}

