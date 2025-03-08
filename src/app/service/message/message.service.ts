import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { type Observable, throwError } from "rxjs"
import { catchError, tap } from "rxjs/operators"
import type { Message, User } from "../../models/message/message.module"

@Injectable({
  providedIn: "root",
})
export class MessageService {
  private apiUrl = "http://localhost:8445/api/messages"
  private userApiUrl = "http://localhost:8445/api/V1/users"

  constructor(private http: HttpClient) {}

  // Récupérer tous les messages
  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl)
  }

  // Envoyer un nouveau message
  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message)
  }

  // Récupérer les messages entre deux utilisateurs
  getMessagesBetweenUsers(senderId: string, receiverId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/between/${senderId}/${receiverId}`)
  }

  // Récupérer les messages reçus par un utilisateur
  getReceivedMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/received/${userId}`)
  }

  // Récupérer les messages envoyés par un utilisateur
  getSentMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/sent/${userId}`)
  }

  // Marquer un message comme lu
  markAsRead(messageId: string): Observable<Message> {
    return this.http.patch<Message>(`${this.apiUrl}/${messageId}/read`, {})
  }

  // Supprimer un message
  deleteMessage(messageId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${messageId}`)
  }

  // Récupérer les informations d'un utilisateur
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/${id}`).pipe(
      tap((user) => console.log("Utilisateur récupéré", user)),
      catchError((error) => {
        console.error("Erreur lors de la récupération du user", error)
        return throwError(() => error)
      }),
    )
  }
}

