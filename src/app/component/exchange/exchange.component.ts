import { Component, type OnInit, ViewChild, type ElementRef, type AfterViewChecked } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  ActivatedRoute, RouterModule } from "@angular/router"
import { HeaderComponent } from "../header/header.component"
import { FormsModule } from "@angular/forms"
import { trigger, transition, style, animate, query, stagger } from "@angular/animations"
import {Message, User} from "../../models/message/message.module";
import {Post} from "../../models/post/post.module";
import {MessageService} from "../../service/message/message.service";
import {PostService} from "../../service/post/post.service";
import {AuthService} from "../../service/auth/auth.service";


@Component({
  selector: "app-exchange",
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
            Échange avec {{ receiver?.name || receiverName }}
          </h1>
          <p class="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Discutez des détails de l'échange pour l'objet "{{ post?.title || postTitle }}"
          </p>
        </div>
      </section>

      <!-- Exchange Section -->
      <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-5xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Left Sidebar with Post and User Info -->
              <div class="lg:col-span-1">
                <!-- Post Info Card -->
                <div *ngIf="post" class="bg-white rounded-xl shadow-lg overflow-hidden mb-6" [@fadeIn]>
                  <div class="relative h-48">
                    <img
                      [src]="getPostImage()"
                      [alt]="post.title"
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute top-2 right-2">
                      <span class="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {{ post.status }}
                      </span>
                    </div>
                  </div>
                  <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ post.title }}</h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ post.description }}</p>

                    <div class="flex items-center text-sm text-gray-500 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ post.location }}
                    </div>

                    <a
                      [routerLink]="['/posts', post.id]"
                      class="block w-full px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition-all text-center text-sm">
                      Voir l'annonce complète
                    </a>
                  </div>
                </div>

                <!-- Receiver Info Card -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8" [@fadeIn]>
                  <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h3>

                    <div class="flex items-center mb-4">
                      <div class="h-16 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold mr-4">
                        {{ getReceiverInitials() }}
                      </div>
                      <div>
                        <h4 class="text-base font-medium text-gray-900">{{ receiver?.name || receiverName }}</h4>
                        <p class="text-sm text-gray-500">
                          <span *ngIf="isOnline" class="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                          <span *ngIf="!isOnline" class="inline-block w-2 h-2 rounded-full bg-gray-400 mr-1"></span>
                          {{ isOnline ? 'En ligne' : 'Hors ligne' }}
                        </p>
                      </div>
                    </div>

                    <div *ngIf="receiver?.location" class="flex items-center text-sm text-gray-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ receiver?.location }}
                    </div>

                    <div *ngIf="receiver?.email" class="flex items-center text-sm text-gray-600 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {{ receiver?.email }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Chat Section -->
              <div class="lg:col-span-2">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden h-[600px] flex flex-col" [@fadeIn]>
                  <!-- Chat Header -->
                  <div class="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white mr-3">
                        {{ getReceiverInitials() }}
                      </div>
                      <div>
                        <h3 class="text-lg font-semibold text-gray-900">{{ receiver?.name || receiverName }}</h3>
                        <p class="text-xs text-gray-500">
                          <span *ngIf="isOnline" class="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                          <span *ngIf="!isOnline" class="inline-block w-2 h-2 rounded-full bg-gray-400 mr-1"></span>
                          {{ isOnline ? 'En ligne' : 'Hors ligne' }}
                        </p>
                      </div>
                    </div>

                    <div class="flex items-center">
                      <button class="text-gray-500 hover:text-indigo-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Messages -->
                  <div class="flex-1 overflow-y-auto p-4 bg-gray-50" #messageContainer>
                    <div *ngIf="isLoading" class="flex justify-center items-center h-full">
                      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>

                    <div *ngIf="!isLoading && messages.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p>Aucun message. Commencez la conversation !</p>
                    </div>

                    <div *ngIf="!isLoading && messages.length > 0">
                      <div *ngFor="let message of messages" class="mb-4">
                        <div [class.justify-end]="message.senderId === currentUserId" class="flex">
                          <!-- Sender avatar (only for received messages) -->
                          <div *ngIf="message.senderId !== currentUserId" class="flex-shrink-0 mr-2 mt-1">
                            <div class="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs">
                              {{ getReceiverInitials() }}
                            </div>
                          </div>

                          <!-- Message bubble -->
                          <div class="max-w-[75%]">
                            <!-- Sender name (only for received messages) -->
                            <div *ngIf="message.senderId !== currentUserId" class="text-xs text-gray-500 ml-1 mb-1">
                              {{ receiver?.name || receiverName }}
                            </div>

                            <!-- Message content -->
                            <div
                              [class.bg-indigo-600]="message.senderId === currentUserId"
                              [class.text-white]="message.senderId === currentUserId"
                              [class.bg-white]="message.senderId !== currentUserId"
                              [class.rounded-tr-lg]="message.senderId === currentUserId"
                              [class.rounded-tl-lg]="message.senderId !== currentUserId"
                              [class.rounded-bl-lg]="true"
                              [class.rounded-br-lg]="true"
                              class="px-4 py-2 shadow-sm"
                            >
                              <p class="text-sm whitespace-pre-wrap">{{ message.body }}</p>

                              <!-- Attachment if any -->
                              <a
                                *ngIf="message.attachment"
                                [href]="message.attachment"
                                target="_blank"
                                class="mt-2 flex items-center text-xs font-medium underline"
                                [class.text-indigo-200]="message.senderId === currentUserId"
                                [class.text-indigo-600]="message.senderId !== currentUserId"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                Pièce jointe
                              </a>
                            </div>

                            <!-- Message time -->
                            <div
                              [class.text-right]="message.senderId === currentUserId"
                              class="text-xs text-gray-500 mt-1 px-1"
                            >
                              {{ formatMessageTime(message.createdAt) }}

                              <!-- Read status for sent messages -->
                              <span *ngIf="message.senderId === currentUserId" class="ml-1">
                                <svg *ngIf="message.isRead" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 inline text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 1.414l-8 8z" />
                                </svg>
                                <svg *ngIf="!message.isRead" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 inline text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 1.414l-8 8z" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Message Input -->
                  <div class="p-4 border-t border-gray-200">
                    <form (submit)="sendMessage($event)" class="flex items-center">
                      <button
                        type="button"
                        class="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <input
                        type="text"
                        [(ngModel)]="newMessage"
                        name="message"
                        placeholder="Écrivez votre message..."
                        class="flex-1 mx-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        type="submit"
                        [disabled]="!newMessage.trim()"
                        class="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </form>
                  </div>
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

      @keyframes float {
        from { transform: translateY(0) rotate(0deg); }
        to { transform: translateY(-50px) rotate(360deg); }
      }

      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .whitespace-pre-wrap {
        white-space: pre-wrap;
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
    trigger("staggerMessages", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(10px)" }),
            stagger(100, [animate("0.3s ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class ExchangeComponent implements OnInit, AfterViewChecked {
  // Modifier la déclaration de messageContainer pour utiliser une approche optionnelle
  @ViewChild("messageContainer") private messageContainer?: ElementRef

  messages: Message[] = []
  groupedMessages: Map<string, Message[]> = new Map()
  newMessage = ""
  isLoading = true
  post: Post | null = null
  postTitle = "Chargement..."
  receiverName = "Utilisateur"
  currentUserId = ""
  receiverId = ""
  isOnline = Math.random() > 0.5 // Simuler l'état en ligne aléatoirement

  // Informations utilisateur
  receiver: User | null = null
  sender: User | null = null

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private postService: PostService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getId() || ""

    // Charger les informations de l'utilisateur courant
    if (this.currentUserId) {
      this.loadUserInfo(this.currentUserId, "sender")
    }

    const postId = this.route.snapshot.paramMap.get("id")
    if (postId) {
      this.loadPost(postId)
    } else {
      // Si pas de postId, on charge directement les messages entre deux utilisateurs
      const receiverId = this.route.snapshot.paramMap.get("receiverId")
      if (receiverId) {
        this.receiverId = receiverId
        this.loadUserInfo(receiverId, "receiver")
        this.loadMessages()
      } else {
        this.isLoading = false
      }
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }

  loadUserInfo(userId: string, userType: "sender" | "receiver"): void {
    this.messageService.getUser(userId).subscribe({
      next: (user) => {
        if (userType === "sender") {
          this.sender = user
        } else {
          this.receiver = user
          this.receiverName = user.name || `Utilisateur ${userId.substring(0, 5)}`
        }
      },
      error: (error) => {
        console.error(`Erreur lors du chargement des informations de l'${userType}:`, error)
      },
    })
  }

  loadPost(postId: string): void {
    this.postService.getPostById(postId).subscribe({
      next: (post) => {
        this.post = post
        this.postTitle = post.title
        this.receiverId = post.userId

        // Charger les informations du propriétaire du post
        this.loadUserInfo(post.userId, "receiver")
        this.loadMessages()
      },
      error: (error) => {
        console.error("Erreur lors du chargement du post:", error)
        this.isLoading = false
      },
    })
  }

  loadMessages(): void {
    if (!this.currentUserId || !this.receiverId) {
      this.isLoading = false
      return
    }

    this.messageService.getMessagesBetweenUsers(this.currentUserId, this.receiverId).subscribe({
      next: (messages) => {
        this.messages = messages
        this.isLoading = false
        this.scrollToBottom()

        // Mark unread messages as read
        messages
          .filter((m) => !m.isRead && m.senderId === this.receiverId)
          .forEach((message) => {
            if (message.id) {
              this.messageService.markAsRead(message.id).subscribe()
            }
          })
      },
      error: (error) => {
        console.error("Erreur lors du chargement des messages:", error)
        this.isLoading = false
      },
    })
  }

  markUnreadMessagesAsRead(messages: Message[]): void {
    // Trouver les messages non lus envoyés par l'autre utilisateur
    const unreadMessages = messages.filter((m) => !m.isRead && m.senderId === this.receiverId)

    // Marquer chaque message non lu comme lu
    unreadMessages.forEach((message) => {
      if (message.id) {
        this.messageService.markAsRead(message.id).subscribe({
          next: () => {
            message.isRead = true
          },
          error: (error) => {
            console.error("Erreur lors du marquage du message comme lu:", error)
          },
        })
      }
    })
  }

  sendMessage(event: Event): void {
    event.preventDefault()

    if (!this.newMessage.trim() || !this.currentUserId || !this.receiverId) return

    const message: Message = {
      body: this.newMessage,
      isRead: false,
      senderId: this.currentUserId,
      receiverId: this.receiverId,
    }

    // Optimistic UI update
    const tempMessage = { ...message, createdAt: new Date() }
    this.messages.push(tempMessage)

    // Mettre à jour les groupes de messages
    this.groupMessagesByDate(this.messages)

    this.newMessage = ""
    this.scrollToBottom()

    this.messageService.sendMessage(message).subscribe({
      next: (sentMessage) => {
        // Replace the temp message with the actual one from the server
        const index = this.messages.indexOf(tempMessage)
        if (index !== -1) {
          this.messages[index] = sentMessage
          this.groupMessagesByDate(this.messages)
        }
      },
      error: (error) => {
        console.error("Erreur lors de l'envoi du message:", error)
        // Remove the temp message on error
        const index = this.messages.indexOf(tempMessage)
        if (index !== -1) {
          this.messages.splice(index, 1)
          this.groupMessagesByDate(this.messages)
        }
      },
    })
  }

  getPostImage(): string {
    if (!this.post || !this.post.photos || this.post.photos.length === 0) {
      return "/assets/placeholder.jpg"
    }
    return "http://localhost:8445/" + this.post.photos[0].filePath
  }

  getReceiverInitials(): string {
    const name = this.receiver?.name || this.receiverName
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2)
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
      return `Hier, ${messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    }

    // Sinon, afficher l'heure uniquement
    return messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  formatDateHeader(dateStr: string): string {
    const date = new Date(dateStr)
    const now = new Date()

    // Si c'est aujourd'hui
    if (date.toDateString() === now.toDateString()) {
      return "Aujourd'hui"
    }

    // Si c'est hier
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    if (date.toDateString() === yesterday.toDateString()) {
      return "Hier"
    }

    // Si c'est cette semaine
    const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (daysDiff < 7) {
      return date.toLocaleDateString(undefined, { weekday: "long" })
    }

    // Sinon, afficher la date complète
    return date.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
  }

  formatDate(date: Date | undefined): string {
    if (!date) return ""

    const formattedDate = new Date(date)
    return formattedDate.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
  }

  // Puis modifier la méthode scrollToBottom pour vérifier si messageContainer existe
  scrollToBottom(): void {
    try {
      if (this.messageContainer) {
        const element = this.messageContainer.nativeElement
        element.scrollTop = element.scrollHeight
      }
    } catch (err) {
      console.error("Erreur lors du défilement vers le bas:", err)
    }
  }

  groupMessagesByDate(messages: Message[]): void {
    this.groupedMessages = new Map()

    messages.forEach((message) => {
      if (!message.createdAt) return

      const date = new Date(message.createdAt)
      const dateKey = date.toISOString().split("T")[0] // Format YYYY-MM-DD

      if (!this.groupedMessages.has(dateKey)) {
        this.groupedMessages.set(dateKey, [])
      }

      const group = this.groupedMessages.get(dateKey)
      if (group) {
        group.push(message)
      }
    })

    // Trier les messages dans chaque groupe par date
    this.groupedMessages.forEach((messagesGroup) => {
      messagesGroup.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateA - dateB
      })
    })
  }
}

