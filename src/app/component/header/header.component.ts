import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <header class="bg-surface-light dark:bg-surface-dark shadow-lg">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a href="/" class="flex-shrink-0 flex items-center">
              <img
                style=""
                alt="cotrade_logo"
                ngSrc="../../../assets/images/logo2.png"
                width="50"
                height="50"
                priority
              >
              <span class="ml-2 text-2xl font-bold text-white">coTrade</span>
            </a>
          </div>
          <div class="flex items-center">
            <a routerLink="/login" routerLinkActive="bg-primary text-white"
               class="px-3 py-2 rounded-md text-sm font-medium text-text-light dark:text-text-dark hover:bg-primary hover:text-white transition duration-150 ease-in-out">
              Connexion
            </a>
            <a routerLink="/register" routerLinkActive="bg-primary text-white"
               class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-text-light dark:text-text-dark hover:bg-primary hover:text-white transition duration-150 ease-in-out">
              Inscription
            </a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: []
})
export class HeaderComponent {}
