import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import {  Observable, throwError } from "rxjs"
import { catchError, tap, switchMap } from "rxjs/operators"
import  { Message, User } from "../../models/message/message.module"
import {ConversationDTO} from "../../models/conversation/conversation.module";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  private apiUrl = "http://localhost:8445/api"
  private userApiUrl = "http://localhost:8445/api/V1/users"

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  // Récupérer tous les messages
  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages`).pipe(
      tap((messages) => console.log("Messages récupérés:", messages)),
      catchError((error) => {
        console.error("Erreur lors de la récupération des messages:", error)
        return throwError(() => error)
      }),
    )
  }

  // Envoyer un nouveau message
  sendMessage(message: Message): Observable<Message> {
    // Make sure we're using the conversation ID
    if (!message.conversationId) {
      console.error("No conversationId provided for message")
      return throwError(() => new Error("No conversationId provided"))
    }

    // Add the current user as sender
    const currentUserId = this.authService.getId()
    if (!currentUserId) {
      return throwError(() => new Error("User not authenticated"))
    }

    message.senderId = currentUserId

    // Get the conversation to determine the receiver
    return this.http.get<ConversationDTO>(`${this.apiUrl}/conversations/${message.conversationId}`).pipe(
      switchMap((conversation) => {
        // Set the receiver based on the conversation
        message.receiverId = conversation.senderId === currentUserId ? conversation.receiverId : conversation.senderId

        // Send the message
        return this.http.post<Message>(`${this.apiUrl}/messages`, message).pipe(
          tap((sentMessage) => {
            // Update the conversation with the last message
            const conversationUpdate = {
              id: conversation.id,
              lastMessage: message.body,
              updatedAt: new Date(),
            }

            this.http.patch(`${this.apiUrl}/conversations/${message.conversationId}`, conversationUpdate).subscribe({
              error: (error) => console.error("Error updating conversation:", error),
            })
          }),
        )
      }),
    )
  }

  // Récupérer les messages d'une conversation
  getMessagesByConversation(conversationId: string,userId:string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/conversation/${conversationId}/${userId}`).pipe(
      tap((messages) => console.log("Messages de la conversation récupérés:", messages)),
      catchError((error) => {
        console.error("Erreur lors de la récupération des messages de la conversation:", error)
        return throwError(() => error)
      }),
    )
  }

  getMessagesBetweenUsers(senderId: string, receiverId: string, postId?: string): Observable<Message[]> {
    // Si postId est fourni, l'inclure dans l'URL
    if (postId) {
      return this.http.get<Message[]>(`${this.apiUrl}/messages/between/${senderId}/${receiverId}/${postId}`).pipe(
        tap((messages) => console.log("Messages entre utilisateurs récupérés:", messages)),
        catchError((error) => {
          console.error("Erreur lors de la récupération des messages entre utilisateurs:", error)
          return throwError(() => error)
        }),
      )
    }
    // Sinon, récupérer les messages entre les deux utilisateurs sans spécifier de post
    return this.http.get<Message[]>(`${this.apiUrl}/messages/between/${senderId}/${receiverId}`).pipe(
      tap((messages) => console.log("Messages entre utilisateurs récupérés:", messages)),
      catchError((error) => {
        console.error("Erreur lors de la récupération des messages entre utilisateurs:", error)
        return throwError(() => error)
      }),
    )
  }

  // Récupérer les messages reçus par un utilisateur
  getReceivedMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/received/${userId}`).pipe(
      tap((messages) => console.log("Messages reçus récupérés:", messages)),
      catchError((error) => {
        console.error("Erreur lors de la récupération des messages reçus:", error)
        return throwError(() => error)
      }),
    )
  }

  // Récupérer les messages envoyés par un utilisateur
  getSentMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/sent/${userId}`).pipe(
      tap((messages) => console.log("Messages envoyés récupérés:", messages)),
      catchError((error) => {
        console.error("Erreur lors de la récupération des messages envoyés:", error)
        return throwError(() => error)
      }),
    )
  }

  // Marquer un message comme lu
  markAsRead(messageId: string): Observable<Message> {
    return this.http.patch<Message>(`${this.apiUrl}/messages/${messageId}/read`, {}).pipe(
      tap((message) => console.log("Message marqué comme lu:", message)),
      catchError((error) => {
        console.error("Erreur lors du marquage du message comme lu:", error)
        return throwError(() => error)
      }),
    )
  }

  // Supprimer un message
  deleteMessage(messageId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/messages/${messageId}`).pipe(
      tap(() => console.log("Message supprimé")),
      catchError((error) => {
        console.error("Erreur lors de la suppression du message:", error)
        return throwError(() => error)
      }),
    )
  }

  // Récupérer les informations d'un utilisateur
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/${id}`).pipe(
      tap((user) => console.log("Utilisateur récupéré:", user)),
      catchError((error) => {
        console.error("Erreur lors de la récupération de l'utilisateur:", error)
        return throwError(() => error)
      }),
    )
  }
}

