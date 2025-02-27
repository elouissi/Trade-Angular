import { Component, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              (click)="onToggleSidebar()"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span class="sr-only">Toggle sidebar</span>
            </button>
            <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Trading Dashboard</h1>
          </div>

          <div class="flex items-center gap-4">
            <button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Trade Now
            </button>

            <button
              (click)="onToggleTheme()"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              <span class="sr-only">Toggle theme</span>
            </button>

            <button class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span class="sr-only">Notifications</span>
            </button>

            <button class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span class="sr-only">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>()
  @Output() toggleTheme = new EventEmitter<void>()

  onToggleSidebar() {
    this.toggleSidebar.emit()
  }

  onToggleTheme() {
    this.toggleTheme.emit()
  }
}

