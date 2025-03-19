import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import {Post} from "../../models/post/post.module";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiUrl = "http://localhost:8445/api/V1/posts"

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllPosts(): Observable<Post[]> {
      return this.http.get<Post[]>(this.apiUrl)
  }
  getAllPostsByCreated(Id:string | null): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/created/${Id}`)
  }


  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`)
  }

  createPost(formData: FormData): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, formData)
  }

  updatePost(id: string, formData: FormData): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, formData)
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}

