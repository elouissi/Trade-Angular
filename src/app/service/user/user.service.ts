import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {PasswordChange, User} from "../../models/user/user.module";
import {Post} from "../../models/post/post.module";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:8445/api/V1/users";

  constructor(private http: HttpClient) {}

  // Récupérer le profil de l'utilisateur actuel
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`).pipe(
      tap(user => console.log('Profil utilisateur récupéré', user)),
      catchError(error => {
        console.error('Erreur lors de la récupération du profil', error);
        return throwError(() => error);
      })
    );
  }
  getUser(id:String): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      tap(user => console.log(' utilisateur récupéré', user)),
      catchError(error => {
        console.error('Erreur lors de la récupération du user', error);
        return throwError(() => error);
      })
    );
  }

  // Mettre à jour le profil de l'utilisateur
  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, user).pipe(
      tap(updatedUser => console.log('Profil utilisateur mis à jour', updatedUser)),
      catchError(error => {
        console.error('Erreur lors de la mise à jour du profil', error);
        return throwError(() => error);
      })
    );
  }

  changePassword(passwordData: PasswordChange): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, passwordData).pipe(
      tap(response => console.log('Mot de passe changé avec succès', response)),
      catchError(error => {
        console.error('Erreur lors du changement de mot de passe', error);
        return throwError(() => error);
      })
    );
  }

  // Supprimer le compte utilisateur
  deleteAccount(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/profile`).pipe(
      tap(response => console.log('Compte supprimé avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de la suppression du compte', error);
        return throwError(() => error);
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }
}
