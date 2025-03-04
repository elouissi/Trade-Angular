import { Component, Input } from "@angular/core"
import {CommonModule, NgOptimizedImage} from "@angular/common"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <aside
      [class.translate-x-0]="isOpen"
      [class.translate-x-[-100%]]="!isOpen"
      class="fixed left-0 top-0 z-40 h-screen w-64 transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
    >
      <div class="h-16 flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-400">
        <img
          style=""
          alt="cotrade_logo"
          ngSrc="../../../../assets/images/logo2.png"
          width="50"
          height="50"
          priority
        >
      </div>

      <nav class="mt-5 px-2 space-y-1">
        <a
          routerLink="/"
          routerLinkActive="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          [routerLinkActiveOptions]="{exact: true}"
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
        >
          <svg class="mr-4 h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </a>

        <a
          routerLink="/dashboard/posts"
          routerLinkActive="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
        >
          <svg class="mr-4 h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          posts
        </a>

        <a
          routerLink="/portfolio"
          routerLinkActive="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
        >
          <svg class="mr-4 h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Portfolio
        </a>

        <a
          routerLink="/transactions"
          routerLinkActive="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
        >
          <svg class="mr-4 h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Transactions
        </a>
      </nav>
    </aside>
  `,
})
export class SidebarComponent {
  @Input() isOpen = true
}

