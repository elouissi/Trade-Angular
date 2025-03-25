import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {jwtDecode, JwtPayload} from "jwt-decode";



export interface LoginResponse {
  token: string;
}
export interface CustomJwtPayload extends JwtPayload {
  username?: string;
  role?: string;
  email?: string;
  id?: string;
}
interface RegistrationData {
  name: string;
  email: string;
  password: string;
  location: string;
}
export interface RegisterResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8445/api/V1/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const data = { email, password };

    return this.http.post<LoginResponse>(`${this.baseUrl}/authentication`, data).pipe(
      // Save the token to localStorage when login is successful
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('currentUser', response.token); // Store the token
        }
      })
    );
  }
  register(data: RegistrationData): Observable<any> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, data).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('currentUser', response.token);
        }
      })
    );
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    const localRole = localStorage.getItem('userRole');
    if (localRole) {
       localStorage.removeItem('userRole');
    }
  }
  getUserFromToken(): JwtPayload | null {
    const token = localStorage.getItem('currentUser'); // Récupérer le token du localStorage
    if (!token) {
      return null;
    }

    try {
      const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
      return decodedToken; // Retourne les informations décodées
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  updateRoleLocally(newRole: string): void {
    localStorage.setItem('userRole', newRole);
  }
  geName(): string | null {
    const token = localStorage.getItem('currentUser');
    if (!token) {
      console.log("le token not found");
      return null;
    }

    try {
      const decodedToken: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
      return decodedToken.username || null; // Retourne le champ "username" ou null
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  getRole(): string | null {
    const localRole = localStorage.getItem('userRole');
    if (localRole) {
      return localRole;
    }
    const token = localStorage.getItem('currentUser');
    if (!token) {
      return null;
    }
    try {
      const decodedToken: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
      return decodedToken.role || null;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  getEmail(): string | null {
    const token = localStorage.getItem('currentUser');
    if (!token) {
      return null;
    }
    try {
      const decodedToken: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
      return decodedToken.email || null;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }

  }
  getId(): string | null {
    const token = localStorage.getItem('currentUser');
    if (!token) {
      return null;
    }
    try {
      const decodedToken: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
      return decodedToken.id || null;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }

  }
  isRole(role:string): boolean {
    return this.getRole() === role;

  }



  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser'); // Check if token exists in localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('currentUser'); // Retrieve the token from localStorage
  }
}
