import { Component } from "@angular/core"
import { CommonModule, NgOptimizedImage } from "@angular/common"
import { RouterModule } from "@angular/router"
import { HeaderComponent } from "../header/header.component"
import { trigger, transition, style, animate, query, stagger } from "@angular/animations"

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
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight" [@letterAnimation]>
            <span *ngFor="let letter of 'Bienvenue sur coTrade'.split(''); let i = index"
                  [style.animation-delay]="i * 0.1 + 's'"
                  class="inline-block">
              {{letter}}
            </span>
          </h1>
          <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto" [@slideUp]>
            Échangez vos objets, réduisez le gaspillage et trouvez des trésors cachés.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center" [@buttonAnimation]>
            <a routerLink="/register"
               class="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-all hover:scale-105 hover:shadow-lg">
              Commencer
            </a>
            <a href="#how-it-works"
               class="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all hover:scale-105 hover:shadow-lg">
              Comment ça marche
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
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <!-- Objet 1: Vélo vintage -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <!-- SVG pour vélo vintage -->
              <img ngSrc="../../../assets/images/category1.jpg" height="150" width="350">

              <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">Vélo vintage</h3>
                <p class="text-gray-600">Vélo des années 70 en excellent état</p>
              </div>
            </div>

            <!-- Objet 2: Collection de livres -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <!-- SVG pour collection de livres -->
              <img ngSrc="../../../assets/images/category2.jpg" height="150" width="350">

              <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">Collection de livres</h3>
                <p class="text-gray-600">Lot de romans classiques</p>
              </div>
            </div>

            <!-- Objet 3: Appareil photo rétro -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <!-- SVG pour appareil photo rétro -->
              <img ngSrc="../../../assets/images/category3.jpg" height="150" width="350">
              <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">Appareil photo rétro</h3>
                <p class="text-gray-600">Appareil photo argentique fonctionnel</p>
              </div>
            </div>

            <!-- Objet 4: Plante d'intérieur -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <!-- SVG pour plante d'intérieur -->
              <img ngSrc="../../../assets/images/category4.jpg" height="150" width="350">
              <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">Plante d'intérieur</h3>
                <p class="text-gray-600">Monstera en parfaite santé</p>
              </div>
            </div>

          </div>
        </div>
      </section>
      <!-- Testimonials Section -->
      <section class="py-20 bg-gradient-to-r from-indigo-600 to-violet-700">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-white mb-12">Témoignages</h2>
          <div class="overflow-x-auto">
            <div class="flex gap-6 pb-8" style="width: max-content; padding-left: 1rem; padding-right: 1rem;">
              <div *ngFor="let testimonial of testimonials"
                   class="w-[300px] bg-white rounded-lg p-6 shadow-xl" [@fadeInRight]>
                <img [src]="testimonial.image" [alt]="testimonial.author"
                     class="w-20 h-20 rounded-full mx-auto mb-4 object-cover">
                <p class="text-gray-600 mb-4">"{{ testimonial.content }}"</p>
                <div class="text-center">
                  <p class="font-semibold text-gray-900">{{ testimonial.author }}</p>
                  <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
                </div>
              </div>
            </div>
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

      .overflow-x-auto {
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .overflow-x-auto::-webkit-scrollbar {
        display: none;
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
export class HomeComponent {
  testimonials = [
    {
      content: "J'ai trouvé des livres rares que je cherchais depuis longtemps. Une véritable mine d'or !",
      author: "Marie Dubois",
      role: "Collectionneuse",
      image: "assets/images/testimonial-1.jpg",
    },
    {
      content: "Grâce à coTrade, j'ai pu échanger mes anciens jeux vidéo contre des nouveaux. Génial !",
      author: "Thomas Laurent",
      role: "Gamer",
      image: "assets/images/testimonial-2.jpg",
    },
    {
      content: "Une communauté incroyable et des échanges très enrichissants. Je recommande !",
      author: "Sophie Martin",
      role: "Artiste",
      image: "assets/images/testimonial-3.jpg",
    },
    {
      content: "La meilleure plateforme pour donner une seconde vie à nos objets. Économique et écologique !",
      author: "Pierre Girard",
      role: "Écologiste",
      image: "assets/images/testimonial-4.jpg",
    },
    {
      content: "Interface intuitive et utilisateurs sérieux. Mes échanges se sont toujours bien passés.",
      author: "Julie Moreau",
      role: "Utilisatrice régulière",
      image: "../../../assets/images/posts",
    },
  ]
}

