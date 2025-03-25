import { Component, type OnInit } from "@angular/core"
import { CommonModule, NgOptimizedImage } from "@angular/common"
import {Router, RouterModule} from "@angular/router"
import { HeaderComponent } from "../layouts/header/header.component"
import { trigger, transition, style, animate, query, stagger } from "@angular/animations"
import  { PostService } from "../../service/post/post.service"
import  { CategoryService } from "../../service/category/category.service"
import  { UserService } from "../../service/user/user.service"
import  { Post } from "../../models/post/post.module"
import  { Category } from "../../models/category/category.module"
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, NgOptimizedImage],
  template: `
    <app-header></app-header>
    <main>
      <!-- Hero Section -->
      <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <!-- Animated background -->
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-700"></div>
          <div class="absolute inset-0 opacity-20">
            <div class="absolute inset-0 pattern-grid-lg animate-float"></div>
          </div>
          <div class="floating-objects">
            <div *ngFor="let i of [1,2,3,4,5]"
                 class="floating-object"
                 [style.animation-delay]="i * 0.5 + 's'">
              <div class="w-16 h-16 bg-white/15 rounded-lg backdrop-blur-sm"></div>
            </div>
          </div>
        </div>

        <div class="container mx-auto px-4 text-center relative z-10" [@heroContent]>
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight" [@letterAnimation]>
            <span>
              Bienvenue sur CoTrade
            </span>
          </h1>
          <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto" [@slideUp]>
            Échangez vos objets, réduisez le gaspillage et trouvez des trésors cachés.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center" [@buttonAnimation]>
            <a *ngIf="!this.authService.isAuthenticated() " routerLink="/register"
               class="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-all hover:scale-105 hover:shadow-lg">
              Commencer
            </a>
            <a href="dashboard/posts" *ngIf="this.authService.isRole('TRADER')"
               class="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all hover:scale-105 hover:shadow-lg">
              Consulter mes posts
            </a>
            <button (click)="updateRole()" *ngIf="authService.isRole('VISITOR')"
                    class="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all hover:scale-105 hover:shadow-lg">
              créer un post
            </button>
            <a href="dashboard"  *ngIf="this.authService.isRole('ADMIN')"
               class="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all hover:scale-105 hover:shadow-lg">
              tableaux de board
            </a>
          </div>
        </div>

        <!-- Animated wave bottom -->
        <div class="absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
          <svg class="absolute bottom-0 w-full h-48" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="rgba(255, 255, 255, 0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            </path>
          </svg>
        </div>
      </section>

      <!-- About Section -->
      <section class="py-20 bg-white overflow-hidden">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row items-center gap-12">
            <!-- Image Column -->
            <div class="lg:w-1/2" [@fadeIn]>
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-violet-700/20 rounded-2xl"></div>
                <img
                  ngSrc="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80"
                  width="600"
                  height="400"
                  alt="Échange communautaire"
                  class="rounded-2xl shadow-2xl object-cover"
                />
                <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-full opacity-50 blur-2xl"></div>
              </div>
            </div>

            <!-- Content Column -->
            <div class="lg:w-1/2 space-y-6" [@slideUp]>
              <h2 class="text-3xl font-bold text-gray-900">
                Découvrez une nouvelle façon d'échanger
              </h2>
              <p class="text-lg text-gray-600">
                coTrade est une plateforme innovante qui permet aux membres de notre communauté d'échanger leurs objets de manière simple et sécurisée. Notre mission est de promouvoir une consommation plus responsable en donnant une seconde vie aux objets.
              </p>
              <ul class="space-y-4">
                <li class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-gray-700">Échanges sécurisés et transparents</span>
                </li>
                <li class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-gray-700">Communauté active et bienveillante</span>
                </li>
                <li class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-gray-700">Impact positif sur l'environnement</span>
                </li>
              </ul>
              <a routerLink="/about"
                 class="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                En savoir plus
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- How it Works Section -->
      <section id="how-it-works" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-black text-center mb-12">Comment ça marche</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Étape 1 -->
            <div class="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-xl shadow-lg">
              <!-- Icône SVG de création de compte -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="#6366F1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <div class="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold mx-auto">
                1
              </div>
              <h3 class="text-xl text-black font-semibold mb-2 text-center">Créez votre compte</h3>
              <p class="text-gray-600 text-center">Inscrivez-vous gratuitement et complétez votre profil en quelques minutes.</p>
            </div>

            <!-- Étape 2 -->
            <div class="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-xl shadow-lg">
              <!-- Icône SVG d'ajout d'objets -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="#6366F1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <div class="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold mx-auto">
                2
              </div>
              <h3 class="text-xl text-black font-semibold mb-2 text-center">Ajoutez vos objets</h3>
              <p class="text-gray-600 text-center">Prenez des photos et décrivez les objets que vous souhaitez échanger.</p>
            </div>

            <!-- Étape 3 -->
            <div class="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-xl shadow-lg">
              <!-- Icône SVG d'échange -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="#6366F1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 1l4 4-4 4"></path>
                <path d="M21 5H9a7 7 0 1 0 0 14h12"></path>
                <path d="M7 23l-4-4 4-4"></path>
                <path d="M3 19h12a7 7 0 1 0 0-14H3"></path>
              </svg>
              <div class="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold mx-auto">
                3
              </div>
              <h3 class="text-xl text-black font-semibold mb-2 text-center">Commencez à échanger</h3>
              <p class="text-gray-600 text-center">Trouvez des objets qui vous intéressent et proposez vos échanges.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Objects Section -->
      <section class="py-20 bg-gray-100">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl text-black font-bold text-center mb-12">Objets en vedette</h2>

          <!-- Loading state -->
          <div *ngIf="isLoading" class="flex justify-center items-center py-10">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
          </div>

          <!-- Error state -->
          <div *ngIf="error" class="text-center py-10">
            <p class="text-red-500">{{ error }}</p>
          </div>

          <div *ngIf="!isLoading && !error" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div *ngFor="let post of featuredPosts" class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="h-48 overflow-hidden">
                <img
                  *ngIf="post.photos && post.photos.length > 0"
                  [src]="getPostImage(post)"
                  [alt]="post.title"
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <img
                  *ngIf="!post.photos || post.photos.length === 0"
                  src="../../../assets/images/placeholder.jpg"
                  [alt]="post.title"
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">{{ post.title }}</h3>
                <p class="text-gray-600 line-clamp-2">{{ post.description }}</p>
                <div class="mt-4 flex justify-between items-center">
                  <span class="text-sm text-indigo-600">{{ post.category }}</span>
                  <a [routerLink]="['/posts', post.id]" class="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                    Voir détails
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- No posts state -->
          <div *ngIf="!isLoading && !error && featuredPosts.length === 0" class="text-center py-10">
            <p class="text-gray-500">Aucun objet en vedette pour le moment.</p>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl text-black font-bold text-center mb-12">Catégories populaires</h2>

          <!-- Loading state -->
          <div *ngIf="isCategoriesLoading" class="flex justify-center items-center py-10">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
          </div>

          <!-- Error state -->
          <div *ngIf="categoriesError" class="text-center py-10">
            <p class="text-red-500">{{ categoriesError }}</p>
          </div>

          <div *ngIf="!isCategoriesLoading && !categoriesError && categories.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div *ngFor="let category of categories" class="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 class="text-xl font-semibold text-indigo-700 mb-2">{{ category.name }}</h3>
              <p *ngIf="category.description" class="text-gray-600 text-sm line-clamp-2">{{ category.description }}</p>
              <a routerLink="/posts" [queryParams]="{category: category.name}" class="mt-4 inline-block text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Explorer
              </a>
            </div>
          </div>

          <!-- No categories state -->
          <div *ngIf="!isCategoriesLoading && !categoriesError && categories.length === 0" class="text-center py-10">
            <p class="text-gray-500">Aucune catégorie disponible pour le moment.</p>
          </div>
        </div>
      </section>

      <!-- Footer Section -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Logo et description -->
            <div class="col-span-1 md:col-span-1">
              <div class="flex items-center mb-4">
                <img src="../../../assets/images/logo2.png" alt="CoTrade Logo" class="h-10 w-10 mr-2">
                <span class="text-xl font-bold">CoTrade</span>
              </div>
              <p class="text-gray-400 mb-4">
                Échangez vos objets, réduisez le gaspillage et trouvez des trésors cachés.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Liens rapides -->
            <div>
              <h3 class="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul class="space-y-2">
                <li><a routerLink="/" class="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
                <li><a routerLink="/posts" class="text-gray-400 hover:text-white transition-colors">Objets</a></li>
                <li><a routerLink="/about" class="text-gray-400 hover:text-white transition-colors">À propos</a></li>
                <li><a routerLink="/contact" class="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <!-- Catégories -->
            <div>
              <h3 class="text-lg font-semibold mb-4">Catégories</h3>
              <ul class="space-y-2">
                <li *ngFor="let category of categories.slice(0, 5)">
                  <a routerLink="/posts" [queryParams]="{category: category.name}" class="text-gray-400 hover:text-white transition-colors">
                    {{ category.name }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h3 class="text-lg font-semibold mb-4">Contact</h3>
              <ul class="space-y-2 text-gray-400">
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Rue de l'Échange, 75001 Paris</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>yassinelouissi67Atgmail.com</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+33 1 23 45 67 89</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {{ currentYear }} CoTrade. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
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

      .overflow-x-auto {
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .overflow-x-auto::-webkit-scrollbar {
        display: none;
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
    trigger("letterAnimation", [
      transition(":enter", [
        query("span", [
          style({ opacity: 0, transform: "translateY(50px)" }),
          stagger(50, [
            animate("0.5s cubic-bezier(0.4, 0, 0.2, 1)", style({ opacity: 1, transform: "translateY(0)" })),
          ]),
        ]),
      ]),
    ]),
    trigger("slideUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("0.8s 0.5s cubic-bezier(0.4, 0, 0.2, 1)", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("buttonAnimation", [
      transition(":enter", [
        query("a", [
          style({ opacity: 0, transform: "translateY(20px)" }),
          stagger(200, [
            animate("0.5s 0.8s cubic-bezier(0.4, 0, 0.2, 1)", style({ opacity: 1, transform: "translateY(0)" })),
          ]),
        ]),
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
            style({ opacity: 0, transform: "translateY(50px)" }),
            stagger(200, [animate("0.5s ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger("fadeInRight", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(20px)" }),
        animate("0.5s ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  featuredPosts: Post[] = []
  isLoading = true
  error: string | null = null

  categories: Category[] = []
  isCategoriesLoading = true
  categoriesError: string | null = null

  currentYear = new Date().getFullYear()

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private userService: UserService,
    protected authService: AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedPosts()
    this.loadCategories()
  }

  loadFeaturedPosts(): void {
    this.isLoading = true
    this.error = null

    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.featuredPosts = posts
        this.isLoading = false
      },
      error: (err) => {
        console.error("Error loading featured posts:", err)
        this.error = "Impossible de charger les objets en vedette. Veuillez réessayer plus tard."
        this.isLoading = false
      },
    })
  }

  loadCategories(): void {
    this.isCategoriesLoading = true
    this.categoriesError = null

    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        // Take up to 8 categories
        this.categories = categories.slice(0, 8)
        this.isCategoriesLoading = false
      },
      error: (err) => {
        console.error("Error loading categories:", err)
        this.categoriesError = "Impossible de charger les catégories. Veuillez réessayer plus tard."
        this.isCategoriesLoading = false
      },
    })
  }
  updateRole(): void {
    this.userService.toTrader(this.authService.getId()).subscribe({
      next: (response) => {
        this.authService.updateRoleLocally('TRADER');
        this.router.navigate(['dashboard/']);
        console.log(response.message);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du rôle', error);
      }
    });
  }
  getPostImage(post: Post): string {
    if (!post.photos || post.photos.length === 0) {
      return "../../../assets/images/placeholder.jpg"
    }
    return "http://localhost:8445/" + post.photos[0].filePath
  }
}

