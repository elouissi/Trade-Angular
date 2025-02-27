import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import {HeaderComponent} from "../layouts/header/header.component";
import {SidebarComponent} from "../layouts/sidebar/sidebar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <!-- Sidebar -->
      <app-sidebar [isOpen]="sidebarOpen"></app-sidebar>

      <div
        class="transition-all duration-300 ease-in-out"
        [class.pl-64]="sidebarOpen"
      >
        <app-header
          (toggleSidebar)="toggleSidebar()"
          (toggleTheme)="toggleTheme()"
        ></app-header>

        <main class="p-4">
          <router-outlet></router-outlet>
         </main>
      </div>
    </div>

  `,
})
export class DashboardComponent {
  sidebarOpen = true
  isDarkMode = false

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode
    if (this.isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }
}

