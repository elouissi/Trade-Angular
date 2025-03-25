import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { trigger, transition, style, animate, query, stagger } from "@angular/animations"
import { HeaderComponent } from "../../layouts/header/header.component"
import  { MessageService } from "../../../service/message/message.service"
import  { AuthService } from "../../../service/auth/auth.service"
import  { PostService } from "../../../service/post/post.service"
import {ConversationDTO} from "../../../models/conversation/conversation.module";
import {ConversationService} from "../../../service/Conversation/conversation.service";
import {Post} from "../../../models/post/post.module";


@Component({
  selector: "app-exchanges-list",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule],
  template: `
    <app-header></app-header>
    <main>
      <!-- Hero Section -->
      <section class="relative py-16 flex items-center justify-center overflow-hidden">
        <!-- Animated background -->
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-700"></div>
          <div class="absolute inset-0 opacity-20">
            <div class="absolute inset-0 pattern-grid-lg animate-float"></div>
          </div>
        </div>

        <div class="container mx-auto px-4 text-center relative z-10" [@fadeIn]>
          <h1 class="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Mes Échanges
          </h1>
          <p class="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Gérez vos conversations et suivez vos échanges en cours
          </p>
        </div>
      </section>

      <!-- Exchanges List Section -->
      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="max-w-5xl mx-auto">
            <!-- Search and Filter -->
            <div class="mb-8 flex flex-col sm:flex-row gap-4">
              <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  [(ngModel)]="searchTerm"
                  (ngModelChange)="filterConversations()"
                  placeholder="Rechercher une conversation..."
                  class="pl-10 block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <select
                [(ngModel)]="filterStatus"
                (ngModelChange)="filterConversations()"
                class="block w-full sm:w-48 px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
              >
                <option value="all">Tous les échanges</option>
                <option value="unread">Non lus</option>
                <option value="read">Lus</option>
              </select>
            </div>

            <!-- Loading state -->
            <div *ngIf="isLoading" class="flex justify-center items-center py-20">
              <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
            </div>

            <!-- Empty state -->
            <div *ngIf="!isLoading && filteredConversations.length === 0" class="text-center py-16 bg-gray-50/50 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 class="mt-4 text-lg font-medium text-gray-900">Aucun échange trouvé</h3>
              <p class="mt-2 text-gray-500 mb-6">Vous n'avez pas encore commencé de conversation.</p>
              <a routerLink="/posts" class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Parcourir les objets
              </a>
            </div>

            <!-- Conversations list -->
            <div *ngIf="!isLoading && filteredConversations.length > 0" class="space-y-4" [@staggerAnimation]="filteredConversations.length">
              <div *ngFor="let conversation of filteredConversations"
                   class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                   [class.border-l-4]="conversation.unreadCount && conversation.unreadCount > 0"
                   [class.border-indigo-500]="conversation.unreadCount && conversation.unreadCount > 0">
                <a [routerLink]="['/exchanges', conversation.id]" class="block p-4">
                  <div class="flex items-start">
                    <!-- User avatar or post image -->
                    <div class="flex-shrink-0 mr-4">
                      <div *ngIf="conversation.postImage" class="h-16 w-16 rounded-lg overflow-hidden">
                        <img [src]="'http://localhost:8445/' + conversation.postImage" [alt]="conversation.postTitle" class="h-full w-full object-cover" />
                      </div>
                      <div *ngIf="!conversation.postImage" class="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white">
                        {{ getUserInitials(conversation.senderId === currentUserId ? conversation.receiverName || 'Utilisateur' : conversation.senderName || 'Utilisateur') }}
                      </div>
                    </div>

                    <!-- Conversation details -->
                    <div class="flex-1 min-w-0">
                      <div class="flex justify-between items-start">
                        <h3 class="text-lg font-semibold text-gray-900 truncate">
                          {{ conversation.postTitle || (conversation.senderId === currentUserId ? conversation.receiverName : conversation.senderName) || 'Conversation' }}
                        </h3>
                        <span class="text-xs text-gray-500">
                          {{ formatMessageTime(conversation.updatedAt) }}
                        </span>
                      </div>

                      <p class="text-sm text-gray-600 mt-1 line-clamp-1">
                        {{ conversation.lastMessage || 'Aucun message' }}
                      </p>

                      <div class="flex justify-between items-center mt-2">
                        <div class="flex items-center text-xs text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {{ conversation.senderId === currentUserId ? 'Vous' : conversation.senderName || 'Utilisateur' }}
                        </div>

                        <div *ngIf="conversation.unreadCount && conversation.unreadCount > 0" class="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {{ conversation.unreadCount }}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
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

      @keyframes float {
        from { transform: translateY(0) rotate(0deg); }
        to { transform: translateY(-50px) rotate(360deg); }
      }

      .line-clamp-1 {
        display: -webkit-box;
      }

      .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      :host {
        display: block;
        min-height: 100vh;
        background-color: white;
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
    trigger("staggerAnimation", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(20px)" }),
            stagger(100, [animate("0.4s ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class ExchangesListComponent implements OnInit {
  conversations: ConversationDTO[] = []
  filteredConversations: ConversationDTO[] = []
  isLoading = true
  currentUserId = ""
  searchTerm = ""
  filterStatus: "all" | "read" | "unread" = "all"

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private postService: PostService,
    private conversationService: ConversationService,
  ) {}
  selectedPhotoIndices: Map<string, number> = new Map()


  ngOnInit(): void {
    this.currentUserId = this.authService.getId() || ""
    if (this.currentUserId) {
      this.loadConversations()
    } else {
      this.isLoading = false
    }
  }

  loadConversations(): void {
    this.conversationService.getConversationsByUserId(this.currentUserId).subscribe({
      next: (conversations) => {
        this.conversations = conversations
        this.filteredConversations = conversations
        this.isLoading = false
      },
      error: (error) => {
        console.error("Erreur lors du chargement des conversations:", error)
        this.isLoading = false
      },
    })
  }

  filterConversations(): void {
    this.filteredConversations = this.conversations.filter((conversation) => {
      // Filter by search term
      const matchesSearch =
        !this.searchTerm ||
        (conversation.senderName && conversation.senderName.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (conversation.receiverName &&
          conversation.receiverName.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (conversation.postTitle && conversation.postTitle.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (conversation.lastMessage && conversation.lastMessage.toLowerCase().includes(this.searchTerm.toLowerCase()))

      // Filter by read/unread status
      const matchesStatus =
        this.filterStatus === "all" ||
        (this.filterStatus === "unread" && conversation.unreadCount && conversation.unreadCount > 0) ||
        (this.filterStatus === "read" && (!conversation.unreadCount || conversation.unreadCount === 0))

      return matchesSearch && matchesStatus
    })
  }

  getUserInitials(name: string): string {
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2)
  }
  getSelectedPhotoIndex(post: Post): number {
    return post.id ? this.selectedPhotoIndices.get(post.id) || 0 : 0
  }


  formatMessageTime(date: Date | undefined): string {
    if (!date) return ""

    const messageDate = new Date(date)
    const now = new Date()

    // Si c'est aujourd'hui, afficher l'heure
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // Si c'est hier
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return `Hier`
    }

    // Si c'est cette semaine
    const daysDiff = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24))
    if (daysDiff < 7) {
      return messageDate.toLocaleDateString(undefined, { weekday: "long" })
    }

    // Sinon, afficher la date
    return messageDate.toLocaleDateString()
  }
  getMainPhotoUrl(post: Post): string {
    if (!post.photos || post.photos.length === 0) {
      return "/assets/placeholder.jpg"
    }

    const selectedIndex = this.getSelectedPhotoIndex(post)
    return "http://localhost:8445/" + post.photos[selectedIndex].filePath
  }


  loadPostDetails(postId: string, conversation: ConversationDTO): void {
    if (!postId) {
      conversation.postTitle = "Post inconnu"
      return
    }

    this.postService.getPostById(postId).subscribe({
      next: (post) => {
        if (post) {
          conversation.postTitle = post.title
          if (post.photos && post.photos.length > 0) {
            conversation.postImage = "http://localhost:8445/" + post.photos[0].filePath
          }
        }
      },
      error: (error) => {
        console.error(`Erreur lors du chargement du post ${postId}:`, error)
        // En cas d'erreur, on met un titre par défaut
        conversation.postTitle = "Post indisponible"
      },
    })
  }
}

