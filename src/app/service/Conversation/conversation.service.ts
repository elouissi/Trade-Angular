import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable, throwError, of} from "rxjs"
import {catchError, tap, switchMap} from "rxjs/operators"
import {Conversation, ConversationDTO} from "../../models/conversation/conversation.module";
import {Post} from "../../models/post/post.module";

@Injectable({
  providedIn: "root",
})
export class ConversationService {
  private apiUrl = "http://localhost:8445/api/conversations"

  constructor(private http: HttpClient) {
  }

  // Créer une nouvelle conversation
  createConversation(conversation: Conversation): Observable<Conversation> {
    return this.http.post<Conversation>(this.apiUrl, conversation).pipe(
      tap((response) => console.log("Conversation créée:", response)),
      catchError((error) => {
        console.error("Erreur lors de la création de la conversation:", error)
        return throwError(() => error)
      }),
    )
  }

  getConversationsByPostId(postId: string): Observable<ConversationDTO[]> {
    return this.http.get<ConversationDTO[]>(`${this.apiUrl}/byPost/${postId}`).pipe(
      tap((response) => console.log("Conversations récupérées par postId:", response)),
      catchError((error) => {
        console.error("Erreur lors de la récupération des conversations par postId:", error);
        return throwError(() => error);
      }),
    );
  }

  // Récupérer une conversation par son ID
  getConversationById(id: string): Observable<ConversationDTO> {
    return this.http.get<ConversationDTO>(`${this.apiUrl}/${id}`).pipe(
      tap((response) => console.log("Conversation récupérée:", response)),
      catchError((error) => {
        console.error("Erreur lors de la récupération de la conversation:", error);
        return throwError(() => error);
      }),
    );
  }
  // Récupérer toutes les conversations d'un utilisateur
  getConversationsByUserId(userId: string): Observable<ConversationDTO[]> {
    return this.http.get<ConversationDTO[]>(`${this.apiUrl}/user/${userId}`).pipe(
      tap((response) => console.log("Conversations récupérées:", response)),
      catchError((error) => {
        console.error("Erreur lors de la récupération des conversations:", error)
        return throwError(() => error)
      }),
    )
  }

  // Supprimer une conversation
  deleteConversation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log("Conversation supprimée")),
      catchError((error) => {
        console.error("Erreur lors de la suppression de la conversation:", error)
        return throwError(() => error)
      }),
    )
  }


  // Récupérer ou créer une conversation entre deux utilisateurs pour un post
  getOrCreateConversation(senderId: string, receiverId: string, postId: string): Observable<ConversationDTO> {
    const newConversation: ConversationDTO = {
      senderId,
      receiverId,
      postId,
      lastMessage: "",
      unreadCount: 0,
    };

    return this.http.post<ConversationDTO>(`${this.apiUrl}/find-or-create`, newConversation).pipe(
      tap((response) => console.log("Conversation found or created:", response)),
      catchError((error) => {
        console.error("Error finding or creating conversation:", error);
        return throwError(() => error);
      })
    );
  }

  getAllConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.apiUrl)
  }
}

