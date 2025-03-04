import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  ActivatedRoute, RouterModule } from "@angular/router"
import  { PostService } from "../../../../service/post/post.service"
import {  Post, PostStatus } from "../../../../models/post/post.module"

@Component({
  selector: "app-post-detail",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div *ngIf="post" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <!-- En-tête -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{post.title}}</h1>
            <span [class]="getStatusClass(post.status)"
                  class="px-3 py-1 text-sm font-semibold rounded-full">
              {{post.status}}
            </span>
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{post.location}}
            <span class="mx-2">•</span>
            <span>{{post.category}}</span>
          </div>
        </div>

        <!-- Galerie d'images -->
        <div class="relative">
          <!-- Image principale -->
          <div class="aspect-w-16 aspect-h-9">
            <img *ngIf="post.photos && post.photos.length > 0"
                 [src]="getMainPhotoUrl()"
                 [alt]="post.title"
                 class="w-full h-full object-contain">
          </div>

          <!-- Miniatures -->
          <div *ngIf="post.photos && post.photos.length > 1"
               class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 p-2 bg-black bg-opacity-50 rounded-lg">
            <button *ngFor="let photo of post.photos; let i = index"
                    (click)="setCurrentImage(i)"
                    class="w-16 h-16 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    [class.ring-2]="currentImageIndex === i">
              <img [src]="getPhotoUrl(photo)"
                   [alt]="photo.title || 'Photo ' + (i+1)"
                   class="w-full h-full object-cover">
            </button>
          </div>

          <!-- Boutons de navigation -->
          <button *ngIf="post.photos && post.photos.length > 1"
                  (click)="previousImage()"
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button *ngIf="post.photos && post.photos.length > 1"
                  (click)="nextImage()"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Toutes les photos en miniature -->
        <div *ngIf="post.photos && post.photos.length > 1" class="p-4 bg-gray-100 dark:bg-gray-900 grid grid-cols-5 gap-2">
          <div *ngFor="let photo of post.photos; let i = index"
               (click)="setCurrentImage(i)"
               class="aspect-square cursor-pointer rounded-md overflow-hidden"
               [class.ring-2]="currentImageIndex === i"
               [class.ring-indigo-500]="currentImageIndex === i">
            <img [src]="getPhotoUrl(photo)"
                 [alt]="photo.title || 'Photo ' + (i+1)"
                 class="w-full h-full object-cover">
          </div>
        </div>

        <!-- Description -->
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Description</h2>
          <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">{{post.description}}</p>
        </div>

        <!-- Actions -->
        <div class="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div class="flex justify-end space-x-4">
            <button type="button"
                    routerLink="/dashboard/posts"
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
              Retour
            </button>
            <button type="button"
                    [routerLink]="['/dashboard/posts/edit', post.id]"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Modifier
            </button>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div *ngIf="!post" class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div class="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
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

      .aspect-square {
        position: relative;
        padding-bottom: 100%;
      }

      .aspect-square > img {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        object-fit: cover;
      }
    `,
  ],
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null
  currentImageIndex = 0

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.postService.getPostById(id).subscribe((post) => {
        this.post = post
        console.log("Post loaded:", post) // Pour le débogage

        // Vérifier si les photos sont correctement chargées
        if (post.photos && post.photos.length > 0) {
          console.log("Photos:", post.photos)
          console.log("First photo URL:", this.getPhotoUrl(post.photos[0]))
        }
      })
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

  setCurrentImage(index: number) {
    this.currentImageIndex = index
  }

  previousImage() {
    if (!this.post || !this.post.photos || this.post.photos.length <= 1) return
    this.currentImageIndex = (this.currentImageIndex - 1 + this.post.photos.length) % this.post.photos.length
  }

  nextImage() {
    if (!this.post || !this.post.photos || this.post.photos.length <= 1) return
    this.currentImageIndex = (this.currentImageIndex + 1) % this.post.photos.length
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
}

