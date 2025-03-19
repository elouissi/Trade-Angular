import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { PostService } from "../../../service/post/post.service"
import  { UserService } from "../../../service/user/user.service"
import  { ConversationService } from "../../../service/Conversation/conversation.service"
import  { MessageService } from "../../../service/message/message.service"
import  { CategoryService } from "../../../service/category/category.service"
import {AuthService} from "../../../service/auth/auth.service";

@Component({
  selector: "app-stats",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header avec titre -->
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Tableau de bord</h2>
      </div>

      <!-- Cartes de statistiques -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <!-- Carte Utilisateurs -->
        <div class="bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg shadow-lg overflow-hidden">
          <div class="p-5 flex flex-col items-center">
            <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 class="text-sm font-medium text-white/80 mb-1">Utilisateurs</h3>
            <p class="text-3xl font-bold text-white">{{ userCount }}</p>
          </div>
        </div>

        <!-- Carte Publications -->
        <div class="bg-gradient-to-br from-green-600 to-green-400 rounded-lg shadow-lg overflow-hidden">
          <div class="p-5 flex flex-col items-center">
            <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 class="text-sm font-medium text-white/80 mb-1">Publications</h3>
            <p class="text-3xl font-bold text-white">{{ postCount }}</p>
          </div>
        </div>

        <!-- Carte Conversations -->
        <div class="bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg shadow-lg overflow-hidden">
          <div class="p-5 flex flex-col items-center">
            <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 class="text-sm font-medium text-white/80 mb-1">Conversations</h3>
            <p class="text-3xl font-bold text-white">{{ conversationCount }}</p>
          </div>
        </div>

        <!-- Carte Messages -->
        <div class="bg-gradient-to-br from-amber-600 to-amber-400 rounded-lg shadow-lg overflow-hidden">
          <div class="p-5 flex flex-col items-center">
            <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3 class="text-sm font-medium text-white/80 mb-1">Messages</h3>
            <p class="text-3xl font-bold text-white">{{ messageCount }}</p>
          </div>
        </div>

        <!-- Carte Catégories -->
        <div class="bg-gradient-to-br from-rose-600 to-rose-400 rounded-lg shadow-lg overflow-hidden">
          <div class="p-5 flex flex-col items-center">
            <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </div>
            <h3 class="text-sm font-medium text-white/80 mb-1">Catégories</h3>
            <p class="text-3xl font-bold text-white">{{ categoryCount }}</p>
          </div>
        </div>
      </div>

      <!-- Espace pour les graphiques futurs -->

    </div>
  `,
})
export class StatsComponent implements OnInit {
  userCount = 0
  postCount = 0
  conversationCount = 0
  messageCount = 0
  categoryCount = 0

  constructor(
    private postService: PostService,
    private userService: UserService,
    private conversationService: ConversationService,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.fetchStats()
  }

  fetchStats(): void {
    this.userService.getUserProfile().subscribe((user) => {
      this.userCount = user ? 1 : 0
    })

    this.postService.getAllPosts().subscribe((posts) => {
      this.postCount = posts.length
    })

    this.conversationService.getAllConversations().subscribe((conversations) => {
      this.conversationCount = conversations.length
    })

    this.messageService.getAllMessages().subscribe((messages) => {
      this.messageCount = messages.length
    })

    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categoryCount = categories.length
    })
  }
}

