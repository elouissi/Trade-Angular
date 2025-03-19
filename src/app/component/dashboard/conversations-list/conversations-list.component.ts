import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import  { ConversationService } from "../../../service/Conversation/conversation.service"
import {ConversationDTO} from "../../../models/conversation/conversation.module";

interface Conversation {
  id?: string
  participants: string[]
  lastMessage?: string
  lastMessageDate?: Date
  unreadCount?: number
  isActive?: boolean
}

@Component({
  selector: "app-conversations-list",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header avec actions -->
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Conversations</h2>
        <a routerLink="/dashboard/conversations/new"
           class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          Nouvelle conversation
        </a>
      </div>

      <!-- Filtres -->
      <div class="mb-6">
        <div class="relative">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (ngModelChange)="filterConversations()"
            placeholder="Rechercher..."
            class="block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div *ngIf="searchTerm" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" (click)="clearSearch()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Liste des conversations -->
      <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li *ngFor="let conversation of filteredConversations"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              [routerLink]="['/dashboard/conversations', conversation.id]">
            <div class="px-4 py-4 sm:px-6 flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {{ formatParticipants(conversation.participants) }}
                    </div>
                    <div *ngIf="conversation.unreadCount && conversation.unreadCount > 0"
                         class="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                      {{ conversation.unreadCount }}
                    </div>
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {{ conversation.lastMessage || 'Pas de message' }}
                  </div>
                </div>
              </div>
              <div class="flex items-center">
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ formatDate(conversation.lastMessageDate) }}
                </div>
                <div class="ml-4 flex space-x-2">
                  <button (click)="deleteConversation(conversation, $event)"
                          class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
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
  filteredConversations: Conversation[] = []
  searchTerm = ""

  constructor(private conversationService: ConversationService) {}

  ngOnInit() {
    this.loadConversations()
  }

  loadConversations() {
    this.conversationService.getAllConversations().subscribe({
      next: (conversations) => {
        this.conversations = conversations
        this.filterConversations()
      },
      error: (error) => {
        console.error("Error loading conversations:", error)
        // Données de test en cas d'erreur
        this.conversations = [

        ]
        this.filterConversations()
      },
    })
  }

  filterConversations() {
    if (!this.searchTerm) {
      // this.filteredConversations = [...this.conversations]
      return
    }

    const search = this.searchTerm.toLowerCase()
    // this.filteredConversations = this.conversations.filter((conversation) => {
    //   const participantsMatch = conversation.participants.some((participant) =>
    //     participant.toLowerCase().includes(search),
    //   )
    //   const messageMatch = conversation.lastMessage?.toLowerCase().includes(search)
    //
    //   return participantsMatch || messageMatch
    // })
  }

  clearSearch() {
    this.searchTerm = ""
    this.filterConversations()
  }

  formatParticipants(participants: string[]): string {
    if (participants.length <= 2) {
      return participants.join(", ")
    }
    return `${participants[0]}, ${participants[1]} et ${participants.length - 2} autres`
  }

  formatDate(date?: Date): string {
    if (!date) return ""

    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const day = 24 * 60 * 60 * 1000

    if (diff < day) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diff < 7 * day) {
      const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
      return days[date.getDay()]
    } else {
      return date.toLocaleDateString()
    }
  }

  deleteConversation(conversation: Conversation, event: Event) {
    event.stopPropagation()
    if (confirm(`Êtes-vous sûr de vouloir supprimer cette conversation ?`)) {
      this.conversationService.deleteConversation(conversation.id!).subscribe({
        next: () => {
          this.loadConversations()
        },
        error: (error) => {
          console.error("Error deleting conversation:", error)
        },
      })
    }
  }
}

