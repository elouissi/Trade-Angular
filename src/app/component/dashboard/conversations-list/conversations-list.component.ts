import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { ConversationService } from "../../../service/Conversation/conversation.service"
import { ConversationDTO } from "../../../models/conversation/conversation.module"

@Component({
  selector: "app-conversations-list",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Conversations</h2>

      </div>

      <div class="mb-6">
        <div class="relative">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (ngModelChange)="filterConversations()"
            placeholder="Rechercher par nom, message ou titre..."
            class="block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div *ngIf="searchTerm" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" (click)="clearSearch()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li *ngFor="let conversation of filteredConversations"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              [routerLink]="['/dashboard/conversations', conversation.id]">
            <div class="px-4 py-4 sm:px-6 flex items-start justify-between">
              <div class="flex items-start">
                <div *ngIf="conversation.postImage" class="flex-shrink-0 h-14 w-14 rounded-lg overflow-hidden">
                  <img [src]="'http://localhost:8445/'+conversation.postImage" alt="Post image" class="h-full w-full object-cover" />
                </div>
                <div *ngIf="!conversation.postImage" class="flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>

                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {{ conversation.postTitle || 'Sans titre' }}
                  </div>

                  <!-- Participants -->
                  <div class="flex items-center mb-1">
                    <div class="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      De: {{ conversation.senderName || 'Inconnu' }}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <div class="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      À: {{ conversation.receiverName || 'Inconnu' }}
                    </div>
                    <div *ngIf="conversation.unreadCount && conversation.unreadCount > 0"
                         class="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                      {{ conversation.unreadCount }}
                    </div>
                  </div>

                  <!-- Dernier message -->
                  <div class="text-sm text-gray-500 dark:text-gray-400 max-w-md truncate">
                    {{ conversation.lastMessage || 'Pas de message' }}
                  </div>
                </div>
              </div>

              <!-- Partie droite avec date et actions -->

            </div>
          </li>
        </ul>
      </div>

      <!-- Message si aucun résultat -->
      <div *ngIf="filteredConversations.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Aucune conversation trouvée</h3>
        <p class="mt-1 text-gray-500 dark:text-gray-400">Essayez de modifier votre recherche ou créez une nouvelle conversation.</p>
      </div>
    </div>
  `,
})
export class ConversationsListComponent implements OnInit {
  conversations: ConversationDTO[] = []
  filteredConversations: ConversationDTO[] = []
  searchTerm = ""

  constructor(private conversationService: ConversationService) {}

  ngOnInit() {
    this.loadConversations()
  }

  loadConversations() {
    this.conversationService.getAllConversations().subscribe({
      next: (conversations) => {
        this.conversations = conversations
        this.filteredConversations = [...conversations]
        console.log('Conversations chargées:', this.conversations)
      },
      error: (error) => {
        console.error("Error loading conversations:", error)
      },
    })
  }

  filterConversations() {
    if (!this.searchTerm) {
      this.filteredConversations = [...this.conversations]
      return
    }

    const search = this.searchTerm.toLowerCase()
    this.filteredConversations = this.conversations.filter((conversation) => {
      const senderMatch = conversation.senderName?.toLowerCase().includes(search);
      const receiverMatch = conversation.receiverName?.toLowerCase().includes(search);
      const messageMatch = conversation.lastMessage?.toLowerCase().includes(search);
      const postMatch = conversation.postTitle?.toLowerCase().includes(search);

      return senderMatch || receiverMatch || messageMatch || postMatch;
    })
  }

  clearSearch() {
    this.searchTerm = ""
    this.filterConversations()
  }


}
