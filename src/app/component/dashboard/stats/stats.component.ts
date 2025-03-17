import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { PostService } from "../../../service/post/post.service"
import  { UserService } from "../../../service/user/user.service"
import  { ConversationService } from "../../../service/Conversation/conversation.service"
import  { MessageService } from "../../../service/message/message.service"
import  { CategoryService } from "../../../service/category/category.service"

@Component({
  selector: "app-stats",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-container">
      <div class="stats-header">
        <h2 class="stats-title">Tableau de bord</h2>
      </div>

      <div class="stats-grid">
        <div class="stat-card users-card">
          <div class="stat-content">
            <div class="stat-icon">
              <!-- SVG pour utilisateurs -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Utilisateurs</h3>
            <p class="stat-value">{{ userCount }}</p>
          </div>
        </div>

        <div class="stat-card posts-card">
          <div class="stat-content">
            <div class="stat-icon">
              <!-- SVG pour publications -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3>Publications</h3>
            <p class="stat-value">{{ postCount }}</p>
          </div>
        </div>

        <div class="stat-card conversations-card">
          <div class="stat-content">
            <div class="stat-icon">
              <!-- SVG pour conversations -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <path d="M14 9a2 2 0 0 1-2 2H6l-3 3V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3>Conversations</h3>
            <p class="stat-value">{{ conversationCount }}</p>
          </div>
        </div>

        <div class="stat-card messages-card">
          <div class="stat-content">
            <div class="stat-icon">
              <!-- SVG pour messages -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3>Messages</h3>
            <p class="stat-value">{{ messageCount }}</p>
          </div>
        </div>

        <div class="stat-card categories-card">
          <div class="stat-content">
            <div class="stat-icon">
              <!-- SVG pour catégories -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </div>
            <h3>Catégories</h3>
            <p class="stat-value">{{ categoryCount }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .stats-container {
        width: 100%;
        background-color: #121826; /* Fond sombre comme la sidebar */
        color: white;
        min-height: 100vh;
        padding-bottom: 2rem;
      }

      .stats-header {
        background-color: #1e4bd2; /* Bleu comme dans l'en-tête */
        padding: 0.75rem 1.5rem;
        margin-bottom: 1.5rem;
      }

      .stats-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: white;
        margin: 0;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1.25rem;
        padding: 0 1.5rem;
      }

      .stat-card {
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        height: 100%;
        transition: transform 0.2s, box-shadow 0.2s;
        color: white;
      }

      .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
      }

      /* Couleurs spécifiques pour chaque carte */
      .users-card {
        background: linear-gradient(135deg, #3a7bd5, #2c69c9);
      }

      .posts-card {
        background: linear-gradient(135deg, #11998e, #38ef7d);
      }

      .conversations-card {
        background: linear-gradient(135deg, #8e2de2, #4a00e0);
      }

      .messages-card {
        background: linear-gradient(135deg, #f2994a, #f2c94c);
      }

      .categories-card {
        background: linear-gradient(135deg, #eb3349, #f45c43);
      }

      .stat-content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .stat-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }

      .stat-icon svg {
        width: 30px;
        height: 30px;
        stroke: white;
        stroke-width: 2;
      }

      .stat-card h3 {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: rgba(255, 255, 255, 0.8);
      }

      .stat-value {
        font-size: 2.5rem;
        font-weight: 700;
        color: white;
        margin: 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 480px) {
        .stats-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
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

    this.conversationService.getConversationsByUserId("1").subscribe((conversations) => {
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

