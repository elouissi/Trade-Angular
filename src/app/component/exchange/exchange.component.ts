import { Component,  OnInit, ViewChild,  ElementRef,  AfterViewChecked } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  ActivatedRoute, RouterModule } from "@angular/router"
import { HeaderComponent } from "../layouts/header/header.component"
import { FormsModule } from "@angular/forms"
import { trigger, transition, style, animate, query, stagger } from "@angular/animations"
import  { Message, User } from "../../models/message/message.module"
import  { Post } from "../../models/post/post.module"
import  { MessageService } from "../../service/message/message.service"
import  { PostService } from "../../service/post/post.service"
import  { AuthService } from "../../service/auth/auth.service"
import  { ConversationService } from "../../service/Conversation/conversation.service"

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

      <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-5xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div class="lg:col-span-1">
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

                  <!-- Messages Container -->
                  <div class="flex-1 overflow-y-auto p-4 bg-gray-50" #messageContainer>
                    <!-- Loading State -->
                    <div *ngIf="isLoading" class="flex justify-center items-center h-full">
                      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>

                    <!-- Empty State -->
                    <div *ngIf="!isLoading && messages.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p>Aucun message. Commencez la conversation !</p>
                    </div>


                    <div *ngIf="!isLoading && messages.length > 0" [@staggerMessages]="messages.length">
                      <!-- Messages Loop -->
                      <div *ngFor="let message of messages" class="mb-4">
                        <!-- Message sent by current user -->
                        <div *ngIf="message.senderId === currentUserId" class="flex justify-end">
                          <div class="bg-indigo-600 text-white px-4 py-2 rounded-lg rounded-tr-none shadow-sm">
                            <p>{{ message.body }}</p>
                            <span class="text-xs text-gray-300">{{ formatMessageTime(message.createdAt) }}</span>
                          </div>
                        </div>

                        <!-- Message received from other user -->
                        <div *ngIf="message.senderId !== currentUserId" class="flex justify-start">
                          <div class="bg-white px-4 py-2 rounded-lg rounded-tl-none shadow-sm border border-gray-100">
                            <p class="text-black" >{{ message.body }}</p>
                            <span class="text-xs text-gray-500">{{ formatMessageTime(message.createdAt) }}</span>
                          </div>
                        </div>
                      </div>
                    </div>                  </div>

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
                        class="flex-1 mx-2 px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
  conversationId = ""
  isOnline = Math.random() > 0.5

  receiver: User | null = null
  sender: User | null = null

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private postService: PostService,
    private authService: AuthService,
    private conversationService: ConversationService,
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getId() || ""
    const role = this.authService.getRole()

    const id = this.route.snapshot.paramMap.get("id") || ""
    const receiverId = this.route.snapshot.paramMap.get("receiverId")

    if (role === "TRADER") {
      this.conversationId = id
      this.loadMessagesFromConversation()
    } else if (role === "VISITOR") {
      if (receiverId) {
        this.conversationId = id
        this.loadMessagesFromConversation()
      } else {
        this.loadPost(id)
      }
    }
  }

  ngAfterViewChecked() {}

  loadPost(postId: string): void {
    this.postService.getPostById(postId).subscribe({
      next: (post) => {
        this.post = post
        this.postTitle = post.title
        this.receiverId = post.userId

        this.loadUserInfo(this.receiverId, "receiver")

        this.findOrCreateConversation(postId)
      },
      error: (error) => {
        console.error("Erreur lors du chargement du post:", error)
        this.isLoading = false
      },
    })
  }
  getUserId(): string {
    return this.authService.getId() || ""
  }

  loadMessagesFromConversation(): void {
    if (!this.conversationId) {
      console.error("Aucun ID de conversation disponible");
      this.isLoading = false;
      return;
    }

    this.conversationService.getConversationById(this.conversationId).subscribe({
      next: (conversation) => {
        if (conversation.senderId && conversation.receiverId) {
          this.receiverId =
            conversation.senderId === this.currentUserId ? conversation.receiverId : conversation.senderId;

          this.loadUserInfo(this.receiverId, "receiver");
        }
        this.messageService.getMessagesByConversation(this.conversationId, this.currentUserId).subscribe({
          next: (messages) => {
            this.messages = messages;
            this.isLoading = false;

            this.markUnreadMessagesAsRead(messages);
          },
          error: (error) => {
            console.error("Erreur lors du chargement des messages:", error);
            this.isLoading = false;
          },
        });

        // Charger les détails du post associé à la conversation
        if (conversation.postId) {
          this.postService.getPostById(conversation.postId).subscribe({
            next: (post) => {
              this.post = post;
              this.postTitle = post.title;
            },
            error: (error) => {
              console.error("Erreur lors du chargement du post:", error);
            },
          });
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement de la conversation:", error);
        this.isLoading = false;
      },
    });
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

  findOrCreateConversation(postId: string): void {
    if (!this.currentUserId || !this.receiverId) {
      this.isLoading = false
      return
    }

    this.conversationService.getOrCreateConversation(this.currentUserId, this.receiverId, postId).subscribe({
      next: (conversation) => {
        this.conversationId = conversation.id || ""
        this.loadMessagesFromConversation()
      },
      error: (error) => {
        console.error("Erreur lors de la récupération/création de la conversation:", error)
        this.isLoading = false
      },
    })
  }

  markUnreadMessagesAsRead(messages: Message[]): void {
    const unreadMessages = messages.filter((m) => !m.isRead && m.senderId !== this.currentUserId)
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
    event.preventDefault();

    if (!this.newMessage.trim() || !this.conversationId) return;

    const message: Message = {
      body: this.newMessage,
      isRead: false,
      conversationId: this.conversationId,
      senderId: this.currentUserId, // L'utilisateur actuel est l'expéditeur
      receiverId: this.receiverId,  // Le destinataire est l'autre utilisateur
      createdAt: new Date(),
    };

    const tempMessage = { ...message };
    this.messages.push(tempMessage);
    this.newMessage = "";
    this.messageService.sendMessage(message).subscribe({
      next: (sentMessage) => {
        const index = this.messages.indexOf(tempMessage);
        if (index !== -1) {
          this.messages[index] = sentMessage;
        }
      },
      error: (error) => {
        console.error("Erreur lors de l'envoi du message:", error);
        const index = this.messages.indexOf(tempMessage);
        if (index !== -1) {
          this.messages.splice(index, 1);
        }
      },
    });
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

    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return `Hier, ${messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    }

    return `${messageDate.toLocaleDateString()} ${messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  }
}

